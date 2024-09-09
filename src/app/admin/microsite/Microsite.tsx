"use client";

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
import { DataTableMicrosite } from "@/components/component/datatable-microsite";
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
import {
  useCreateMicrosite,
  useDeleteMicrosite,
  useGetAllMicrosite,
  useUpdateMicrosite,
} from "@/services/useMicrositeService";
import { useAppContext } from "@/app/provider";

export const Microsite = () => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    content: "",
    image: "",
    tipe_section: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMicrositeId, setEditMicrositeId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMicrositeId, setDeleteMicrositeId] = useState<number | null>(
    null
  );

  const { postMicrosite, microsite } = useCreateMicrosite();
  const { postUpdateMicrosite, updateMicrosite } = useUpdateMicrosite();
  const { postDeleteMicrosite, deleteMicrosite } = useDeleteMicrosite();
  const { fetchMicrosites, microsites } = useGetAllMicrosite();

  useEffect(() => {
    fetchData();
  }, [state?.token]);

  useEffect(() => {
    if (microsites?.microsites) {
      setLoading(false);
    }
  }, [microsites]);

  useEffect(() => {
    if (deleteMicrosite || microsite || updateMicrosite) {
      fetchData();
    }
  }, [deleteMicrosite, microsite, updateMicrosite]);

  const fetchData = () => {
    setLoading(true);
    fetchMicrosites({
      header: {
        Authorization: "Bearer " + state?.token,
      },
    });
  };

  const handleEditMicrosite = (id: number) => {
    const micrositeToEdit = microsites.microsites.find(
      (microsite: any) => microsite.id === id
    );
    if (micrositeToEdit) {
      setData({
        content: micrositeToEdit.content,
        image: micrositeToEdit.image ?? "",
        tipe_section: micrositeToEdit.tipe_section,
      });
      setEditMicrositeId(id);
      setDrawerOpen(true); // Open the drawer
    }
  };

  const handleSubmitMicrosites = () => {
    if (editMicrositeId === null) {
      postMicrosite({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          content: data.content,
          image: data.image,
          tipe_section: data.tipe_section,
        },
      });
    } else {
      postUpdateMicrosite({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        body: {
          content: data.content,
          image: data.image,
          tipe_section: data.tipe_section,
        },
        queryParams: {
          id: editMicrositeId,
        },
      });
    }
    fetchData();
    setDrawerOpen(false);
  };

  const handleDeleteMicrosite = async () => {
    postDeleteMicrosite({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        id: deleteMicrositeId,
      },
    });
    fetchData();
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
          Microsites
        </h1>
        <Button
          onClick={() => {
            setDrawerOpen(true);
            setEditMicrositeId(null);
            setData({ content: "", image: "", tipe_section: "" });
          }}
          variant="default"
        >
          + Add Microsites
        </Button>
      </div>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {editMicrositeId ? "Edit Microsite" : "Add Microsite"}
              </DrawerTitle>
              <DrawerDescription>
                {editMicrositeId
                  ? "Edit the microsite details."
                  : "Insert your microsites in here."}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex flex-col gap-3 items-center justify-center">
                <Input
                  type="text"
                  name="content"
                  id="content"
                  placeholder="Content"
                  value={data.content}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Link Image"
                  value={data.image}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  placeholder="Type your description here."
                  name="tipe_section"
                  id="tipe_section"
                  value={data.tipe_section}
                  onChange={handleDataChange}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={handleSubmitMicrosites}>
                {editMicrositeId ? "Save Changes" : "Submit"}
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
        <DataTableMicrosite
          data={microsites?.microsites} // Pass an empty array if data is not available
          loading={loading} // Pass the loading state
          onEdit={handleEditMicrosite}
          onDelete={(id: number) => {
            setDeleteMicrositeId(id);
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
              microsite.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMicrosite}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
