"use client";

import {useEffect, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {useAppContext} from "@/app/provider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {useToast} from "@/hooks/use-toast";
import {useGetMenu} from "@/services/useMenuService";
import Image from "next/image";
import {useCreateReservations} from "@/services/useReservationService";
import {useRouter} from "next/navigation";
import {Skeleton} from "@/components/ui/skeleton";
import {MultiStepLoader as Loader} from "@/components/ui/multi-step-loader";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  disable: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  menus: MenuItem[];
  message: string;
}

const loadingStates = [
  {
    text: "Checking table availability",
  },
  {
    text: "Verifying menu stock",
  },
  {
    text: "Processing your booking",
  },
  {
    text: "Booking successful",
  },
];

export function MenuPage() {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();
  const router = useRouter();

  const { fetchMenu, getMenu } = useGetMenu();
  const { postReservations, reservations, reservationsError } =
    useCreateReservations();

  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [reservationExists, setReservationExists] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchMenu({});
    }
  }, [isClient]);

  useEffect(() => {
    if (getMenu && getMenu.menus) {
      const categories: string[] = getMenu.menus.map(
        (item: MenuItem) => item.category
      );
      const uniqueCategories: string[] = Array.from(new Set(categories));

      setCategories(uniqueCategories);
      setMenus(getMenu.menus);
    }
  }, [getMenu]);

  useEffect(() => {
    if (state?.carts || state?.reservation) {
      const reservation = state?.reservation;
      const carts = state?.carts || [];
      if (reservation) {
        setReservationExists(true);
      }
      setCartItemCount(
        carts.reduce((acc: any, item: any) => acc + (item.qty || 0), 0)
      );
    } else {
      setReservationExists(false);
    }
  }, [state]);

  useEffect(() => {
    if (reservations) {
      setClick(false);
      setLoading(true);
      dispatch({
        ...state,
        carts: [],
        reservation: null
      });
      setTimeout(() => {
        toast({
          title: reservations?.message,
        });
        router.prefetch("/");
        router.push("/");
      }, 8000);
    } else if (reservationsError) {
      setClick(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: reservationsError?.message,
      });
    }
  }, [reservations, reservationsError])

  const filteredMenu = useMemo(() => {
    if (activeFilter === "all") {
      return menus;
    } else {
      return menus.filter((item: MenuItem) => item.category === activeFilter);
    }
  }, [activeFilter, menus]);

  const handleOrderClick = (item: any) => {
    const existingCarts = state?.carts || [];

    const itemIndex = existingCarts.findIndex(
      (cartItem: any) => cartItem.id === item.id
    );

    let updatedCarts;

    if (itemIndex >= 0) {
      updatedCarts = existingCarts.map((cartItem: any) =>
        cartItem.id === item.id
          ? { ...cartItem, qty: (cartItem.qty || 1) + 1 }
          : cartItem
      );
    } else {
      updatedCarts = [...existingCarts, { ...item, qty: 1 }];
    }

    toast({
      title: `${item.name} Added`,
      description: `${item.name} has been successfully added to your cart.`,
    });

    dispatch({ carts: updatedCarts });
  };

  const handleQuantityChange = (id: number, change: number) => {
    const existingCarts = state?.carts || [];
    const updatedCarts = existingCarts
      .map((cartItem: any) =>
        cartItem.id === id
          ? { ...cartItem, qty: Math.max((cartItem.qty || 1) + change, 0) }
          : cartItem
      )
      .filter((item: any) => item.qty > 0);

    dispatch({ carts: updatedCarts });
  };

  const handleRemoveItem = (id: number) => {
    const existingCarts = state?.carts || [];
    const updatedCarts = existingCarts.filter(
      (cartItem: any) => cartItem.id !== id
    );
    dispatch({ carts: updatedCarts });
  };

  const handleSubmitOrder = () => {
    const { reservation, carts } = state || {};

    setClick(true);

    if (!reservation || carts.length === 0) {
      toast({
        title: "No Reservation or Cart",
        description:
          "Please ensure you have a reservation and items in the cart.",
      });
      return;
    }

    const body = {
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      guest: parseInt(reservation.guests),
      reserve_time: reservation.reserve_time,
      menus: carts.map((cartItem: any) => ({
        menu_id: parseInt(cartItem.id),
        quantity: parseInt(cartItem.qty),
      })),
    };

    postReservations({
      body,
    });
  };

  if (!getMenu || !isClient) {
    return (
        <div className="relative w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
          {/* Filter Buttons Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-24 rounded" />
            <Skeleton className="h-10 w-24 rounded" />
          </div>

          {/* Menu Items Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
                <Card key={index}>
                  <Skeleton className="w-full aspect-[3/2] rounded-t-lg" />
                  <CardContent className="grid gap-4 pt-5">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-24 rounded" />
                      <Skeleton className="h-6 w-16 rounded" />
                    </div>
                    <Skeleton className="h-4 w-64 rounded" />
                    <Skeleton className="h-10 w-32 rounded" />
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader loadingStates={loadingStates} loading={loading} duration={2000}/>
        </div>
    );
  }

  return (
      <div className="relative w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          {categories.map((category) => (
              <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMenu.map((item) => (
              <Card key={item.id}>
                <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={400}
                    className="rounded-t-lg object-cover w-full aspect-[3/2]"
                />
                <CardContent className="grid gap-4 pt-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <div className="text-primary font-semibold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                          .format(item.price)
                          .replace(",00", "")}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                  {reservationExists && (
                      <Button onClick={() => handleOrderClick(item)}>Order</Button>
                  )}
                </CardContent>
              </Card>
          ))}
        </div>

        {reservationExists && cartItemCount > 0 && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="fixed bottom-4 right-4 p-6 rounded-full">
                  <ShoppingCartIcon className="w-6 h-6"/>
                  {cartItemCount > 0 && (
                      <span
                          className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Your Cart</DrawerTitle>
                  <DrawerDescription>Review your order below:</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-4 p-4">
                  {(state?.carts || []).map((item: any) => (
                      <div
                          key={item.id}
                          className="flex items-center justify-between border-b border-gray-200 pb-4"
                      >
                        <div className="flex items-center">
                          <Image
                              src={item.image}
                              alt={item.name}
                              width={200}
                              height={200}
                              className="w-16 h-16 object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <div className="flex items-center">
                              <Button
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  disabled={item.qty <= 1}
                              >
                                -
                              </Button>
                              <span className="mx-2">{item.qty}</span>
                              <Button
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button
                            onClick={() => handleRemoveItem(item.id)}
                            variant="destructive"
                        >
                          <Trash2Icon/>
                        </Button>
                      </div>
                  ))}
                </div>
                <DrawerFooter>
                  <Button onClick={handleSubmitOrder}>
                    {click ? "Submitting..." : "Submit Order"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
        )}
      </div>
  );
}

function ShoppingCartIcon(props: any) {
  return (
      <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function Trash2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
