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
import { useToast } from "@/hooks/use-toast";
import { DataTableReservation } from "@/components/component/datatable-reservation";
import { useDeleteReservations, useGetReservations } from "@/services/useReservationService";

export const Reservations = () => {
  const { toast } = useToast();

  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteMenuId, setDeleteMenuId] = useState<number | null>(null);

  const { fetchReservations, getReservations } = useGetReservations();
  const { postDeleteReservations, deleteReservations } = useDeleteReservations();

  useEffect(() => {
    fetchData();
  }, [state?.token]);

  useEffect(() => {
    if (getReservations?.reservations) {
      setLoading(false);
    }
  }, [getReservations]);

  useEffect(() => {
    if (deleteReservations) {
      fetchData();
    }
  }, [deleteReservations]);

  const fetchData = () => {
    setLoading(true);
    fetchReservations({
      header: {
        Authorization: "Bearer " + state?.token,
      },
    });
  };

  const handleDeleteMenu = async () => {
    postDeleteReservations({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        id: deleteMenuId,
      },
    });
    fetchData();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
          Reservations
        </h1>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <DataTableReservation
          data={getReservations?.reservations || []}
          loading={loading}
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
