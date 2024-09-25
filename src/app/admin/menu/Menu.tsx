import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { DataTableMenu } from "@/components/component/datatable-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppContext } from "@/app/provider";
import {
  useCreateMenu,
  useDeleteMenu,
  useGetMenu,
  useUpdateMenu,
} from "@/services/useMenuService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const Menu = () => {
  const { toast } = useToast();

  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    disable: "false", // Change from boolean to string to match Select options
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMenuId, setEditMenuId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMenuId, setDeleteMenuId] = useState<number | null>(null);

  const { postMenu, menu } = useCreateMenu();
  const { postUpdateMenu, updateMenu } = useUpdateMenu();
  const { postDeleteMenu, deleteMenu } = useDeleteMenu();
  const { fetchMenu, getMenu } = useGetMenu();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchData();
    }
  }, [isClient]);

  useEffect(() => {
    if (getMenu?.menus) {
      setLoading(false);
    }
  }, [getMenu]);

  useEffect(() => {
    if (deleteMenu || menu || updateMenu) {
      fetchData();
    }
  }, [deleteMenu, menu, updateMenu]);

  const fetchData = () => {
    setLoading(true);
    fetchMenu({
      header: {
        Authorization: "Bearer " + state?.token,
      },
    });
  };

  const handleEditMenu = (id: number) => {
    const menuToEdit = getMenu.menus.find((menu: any) => menu.id === id);
    if (menuToEdit) {
      setData({
        name: menuToEdit.name,
        description: menuToEdit.description,
        price: menuToEdit.price.toString(),
        category: menuToEdit.category,
        image: menuToEdit.image ?? "",
        stock: menuToEdit.stock.toString(),
        disable: menuToEdit.disable ? "true" : "false", // Convert boolean to string
      });
      setEditMenuId(id);
      setDrawerOpen(true); // Open the drawer
    }
  };

  const handleSubmitMenu = () => {
    const formattedData = {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      stock: parseInt(data.stock, 10),
      disable: data.disable === "true", // Convert string back to boolean
    };

    // Validation check
    if (!formattedData.name) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Name is required.",
      });
    }
    if (!formattedData.description) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Description is required.",
      });
    }
    if (!formattedData.price || isNaN(formattedData.price)) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Price must be a valid number.",
      });
    }
    if (!formattedData.category) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Category is required.",
      });
    }
    if (!formattedData.image) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Image URL is required.",
      });
    }
    if (isNaN(formattedData.stock)) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Stock must be a valid number.",
      });
    }

    // If validation passes, continue with form submission
    if (editMenuId === null) {
      postMenu({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: formattedData,
      });
    } else {
      postUpdateMenu({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: formattedData,
        queryParams: {
          id: editMenuId,
        },
      });
    }

    fetchData();
    setDrawerOpen(false);
  };

  const handleDeleteMenu = async () => {
    postDeleteMenu({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        id: deleteMenuId,
      },
    });
    fetchData();
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setData((prev) => ({ ...prev, disable: value }));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
          Menu
        </h1>
        <Button
          onClick={() => {
            setDrawerOpen(true);
            setEditMenuId(null);
            setData({
              name: "",
              description: "",
              price: "",
              category: "",
              image: "",
              stock: "",
              disable: "false",
            });
          }}
          variant="default"
        >
          + Add Menu
        </Button>
      </div>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>{editMenuId ? "Edit Menu" : "Add Menu"}</DrawerTitle>
              <DrawerDescription>
                {editMenuId
                  ? "Edit the menu details."
                  : "Insert your menu details here."}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex flex-col gap-3 items-center justify-center">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Menu Name"
                  value={data.name}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={data.description}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Price"
                  value={data.price}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Category"
                  value={data.category}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Image URL"
                  value={data.image}
                  onChange={handleDataChange}
                />
                <Input
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="Stock"
                  value={data.stock}
                  onChange={handleDataChange}
                />

                {/* Add onValueChange to update state when selected */}
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Disable</SelectItem>
                    <SelectItem value="false">Enable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={handleSubmitMenu}>
                {editMenuId ? "Save Changes" : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      {loading ? (
        <div>Loading</div>
      ) : (
        <DataTableMenu
          data={getMenu?.menus || []} // Pass an empty array if data is not available
          loading={loading} // Pass the loading state
          onEdit={handleEditMenu}
          onDelete={(id: number) => {
            setDeleteMenuId(id);
            setDeleteDialogOpen(true);
          }}
        />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              menu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMenu}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
