"use client";

import { useAppContext } from "@/app/provider";
import { DataTableMicrosite } from "@/components/component/datatable-microsite";
import { useGetAllMicrosite } from "@/services/useMicrositeService";
import { useEffect, useState } from "react";

export const Signature = ({
  openDrawer,
  fetchTrigger,
  onEditMicrosite,
  onDeleteMicrosite,
}: {
  openDrawer: () => void;
  fetchTrigger: boolean;
  onEditMicrosite: (id: number, micrositeData: any) => void;
  onDeleteMicrosite: (id: number) => void;
}) => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { fetchMicrosites, microsites } = useGetAllMicrosite();

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
    if (state?.fetchSignature) {
      fetchData();
      dispatch({ ...state, fetchSignature: null });
    }
  }, [state]);

  const fetchData = () => {
    setLoading(true);
    fetchMicrosites({
      header: {
        Authorization: "Bearer " + state?.token,
      },
      queryParams: {
        category: "signature",
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleEdit = (id: number) => {
    const micrositeToEdit = microsites?.microsites.find(
      (microsite: any) => microsite.id === id
    );
    if (micrositeToEdit) {
      onEditMicrosite(id, micrositeToEdit);
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <DataTableMicrosite
          data={microsites?.microsites}
          loading={loading}
          onEdit={handleEdit}
          onDelete={onDeleteMicrosite}
        />
      )}
    </>
  );
};
