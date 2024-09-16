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
import { DataTableAbout } from "@/components/component/datatable-about";
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
import { useCreateAbout, useDeleteAbout, useGetAbout, useUpdateAbout } from "@/services/useAboutService";
import { useToast } from "@/hooks/use-toast";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export const About = () => {
  const { toast } = useToast();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    description: "",
    tipe_section: "",
    image: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editAboutId, setEditAboutId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAboutId, setDeleteAboutId] = useState<number | null>(null);

  const { postAbout, about, aboutError } = useCreateAbout();
  const { postUpdateAbout, updateAbout } = useUpdateAbout();
  const { postDeleteAbout, deleteAbout } = useDeleteAbout();
  const { fetchAbout, getAbout } = useGetAbout();

  useEffect(() => {
    fetchData();
  }, [state?.token]);

  useEffect(() => {
    if (getAbout?.abouts) {
      setLoading(false);
    }
  }, [getAbout]);

  useEffect(() => {
    if (aboutError) {
      toast({
        variant: "destructive",
        title: "Can't make the same type",
        description: aboutError?.message,
      });
    }
  }, [aboutError]);

  useEffect(() => {
    if (deleteAbout || about || updateAbout) {
      fetchData();
    }
  }, [deleteAbout, about, updateAbout]);

  const fetchData = () => {
    setLoading(true);
    fetchAbout({
      header: {
        Authorization: "Bearer " + state?.token,
      },
    });
  };

  const handleEditAbout = (id: number) => {
    const aboutToEdit = getAbout.abouts.find(
        (about: any) => about.id === id
    );
    if (aboutToEdit) {
      setData({
        description: aboutToEdit.description,
        tipe_section: aboutToEdit.tipe_section,
        image: aboutToEdit.image ?? "",
      });
      setEditAboutId(id);
      setDrawerOpen(true);
    }
  };

  const handleSubmitAbout = () => {
    const formattedData = {
      description: data.description,
      tipe_section: data.tipe_section,
      image: data.image,
    };

    // Validation
    if (!formattedData.description) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Description is required.",
      });
    }
    if (!formattedData.tipe_section) {
      return toast({
        variant: "destructive",
        title: "Missing field",
        description: "Tipe Section is required.",
      });
    }

    if (editAboutId === null) {
      postAbout({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: formattedData,
      });
    } else {
      postUpdateAbout({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: formattedData,
        queryParams: {
          id: editAboutId,
        },
      });
    }

    fetchData();
    setDrawerOpen(false);
  };

  const handleDeleteAbout = async () => {
    postDeleteAbout({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        id: deleteAboutId,
      },
    });
    fetchData();
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setData((prev) => ({ ...prev, tipe_section: value }));
  };

  return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
            About
          </h1>
          <Button
              onClick={() => {
                setDrawerOpen(true);
                setEditAboutId(null);
                setData({
                  description: "",
                  tipe_section: "",
                  image: "",
                });
              }}
              variant="default"
          >
            + Add About Description
          </Button>
        </div>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  {editAboutId ? "Edit About" : "Add About"}
                </DrawerTitle>
                <DrawerDescription>
                  {editAboutId
                      ? "Edit the about details."
                      : "Insert the about details here."}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <Input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      value={data.description}
                      onChange={handleDataChange}
                  />
                  <Select onValueChange={handleSelectChange} value={data.tipe_section}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="mission">Mission</SelectItem>
                      <SelectItem value="values">Values</SelectItem>
                      <SelectItem value="chef">Chef</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                      type="text"
                      name="image"
                      id="image"
                      placeholder="Image URL"
                      value={data.image}
                      onChange={handleDataChange}
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button onClick={handleSubmitAbout}>
                  {editAboutId ? "Save Changes" : "Submit"}
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
            <DataTableAbout
                data={getAbout?.abouts || []}
                loading={loading}
                onEdit={handleEditAbout}
                onDelete={(id: number) => {
                  setDeleteAboutId(id);
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
                about description.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAbout}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  );
};
