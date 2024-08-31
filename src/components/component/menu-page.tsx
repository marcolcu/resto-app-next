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
    DrawerTrigger
} from "@/components/ui/drawer";

export function MenuPage() {
    const menu = [
        {
            id: 1,
            name: "Bruschetta",
            description: "Toasted bread topped with tomatoes, garlic, and basil",
            price: 8.99,
            category: "appetizer",
            image: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Caesar Salad",
            description: "Crisp romaine lettuce, croutons, and parmesan cheese",
            price: 12.99,
            category: "appetizer",
            image: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Margherita Pizza",
            description: "Tomato sauce, fresh mozzarella, and basil",
            price: 16.99,
            category: "main",
            image: "/placeholder.svg",
        },
        {
            id: 4,
            name: "Spaghetti Bolognese",
            description: "Homemade meat sauce and parmesan cheese",
            price: 18.99,
            category: "main",
            image: "/placeholder.svg",
        },
        {
            id: 5,
            name: "Tiramisu",
            description: "Layers of espresso-soaked ladyfingers and mascarpone",
            price: 9.99,
            category: "dessert",
            image: "/placeholder.svg",
        },
        {
            id: 6,
            name: "Gelato",
            description: "Assorted flavors of Italian-style ice cream",
            price: 6.99,
            category: "dessert",
            image: "/placeholder.svg",
        },
        {
            id: 7,
            name: "Espresso",
            description: "A shot of rich, bold espresso",
            price: 3.99,
            category: "drink",
            image: "/placeholder.svg",
        },
        {
            id: 8,
            name: "Aperol Spritz",
            description: "Aperol, prosecco, and soda water",
            price: 12.99,
            category: "drink",
            image: "/placeholder.svg",
        },
    ];

    const {state, dispatch} = useAppContext();

    const [activeFilter, setActiveFilter] = useState("all");
    const [reservationExists, setReservationExists] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const reservation = state?.reservation;
        const carts = state?.carts || [];

        if (reservation) {
            setReservationExists(true);
        }
        setCartItemCount(carts.reduce((acc: any, item: any) => acc + (item.qty || 0), 0));
    }, [state?.reservation, state?.carts]);

    const filteredMenu = useMemo(() => {
        if (activeFilter === "all") {
            return menu;
        } else {
            return menu.filter((item) => item.category === activeFilter);
        }
    }, [activeFilter, menu]);

    const handleOrderClick = (item: any) => {
        const existingCarts = state?.carts || [];

        // Check if the item already exists in the cart
        const itemIndex = existingCarts.findIndex((cartItem: any) => cartItem.id === item.id);

        let updatedCarts;

        if (itemIndex >= 0) {
            // Item exists, increase the qty
            updatedCarts = existingCarts.map((cartItem: any) =>
                cartItem.id === item.id
                    ? {...cartItem, qty: (cartItem.qty || 1) + 1}  // Increase qty if exists, otherwise set to 1
                    : cartItem
            );
        } else {
            // Item doesn't exist, add it to the cart with qty 1
            updatedCarts = [...existingCarts, {...item, qty: 1}];
        }

        // Dispatch the updated carts array
        dispatch({carts: updatedCarts});
    };

    const handleQuantityChange = (id: number, change: number) => {
        const existingCarts = state?.carts || [];
        const updatedCarts = existingCarts.map((cartItem: any) =>
            cartItem.id === id
                ? {...cartItem, qty: Math.max((cartItem.qty || 1) + change, 0)}
                : cartItem
        ).filter((item: any) => item.qty > 0);

        dispatch({carts: updatedCarts});
    };

    const handleRemoveItem = (id: number) => {
        const existingCarts = state?.carts || [];
        const updatedCarts = existingCarts.filter((cartItem: any) => cartItem.id !== id);
        dispatch({carts: updatedCarts});
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button variant={activeFilter === "all" ? "default" : "outline"} onClick={() => setActiveFilter("all")}>
                    All
                </Button>
                <Button
                    variant={activeFilter === "appetizer" ? "default" : "outline"}
                    onClick={() => setActiveFilter("appetizer")}
                >
                    Appetizers
                </Button>
                <Button variant={activeFilter === "main" ? "default" : "outline"}
                        onClick={() => setActiveFilter("main")}>
                    Main Courses
                </Button>
                <Button variant={activeFilter === "dessert" ? "default" : "outline"}
                        onClick={() => setActiveFilter("dessert")}>
                    Desserts
                </Button>
                <Button variant={activeFilter === "drink" ? "default" : "outline"}
                        onClick={() => setActiveFilter("drink")}>
                    Drinks
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMenu.map((item) => (
                    <Card key={item.id}>
                        <img
                            src={item.image}
                            alt={item.name}
                            width={600}
                            height={400}
                            className="rounded-t-lg object-cover w-full aspect-[3/2]"
                        />
                        <CardContent className="grid gap-4 pt-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <div className="text-primary font-semibold">${item.price}</div>
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
                            {state?.carts.map((item: any) => (
                                <div key={item.id}
                                     className="flex items-center justify-between border-b border-gray-200 pb-4">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4"/>
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
                                    <Button onClick={() => handleRemoveItem(item.id)} variant="destructive">
                                        <Trash2Icon />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <DrawerFooter>
                            <Button>Submit Order</Button>
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
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
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
    )
}