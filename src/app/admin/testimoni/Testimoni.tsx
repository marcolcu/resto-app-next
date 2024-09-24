"use client";

import { useEffect, useState } from "react";
import { DataTableAbout } from "@/components/component/datatable-about";
import { useAppContext } from "@/app/provider";
import { useToast } from "@/hooks/use-toast";
import { useGeTestimoni } from "@/services/useTestimoniService";
import { DataTableTestimonial } from "@/components/component/datatable-testimonial";

export const Testimoni = () => {
  const { toast } = useToast();
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);

  const { fetchTestimoni, geTestimoni } = useGeTestimoni();

  useEffect(() => {
    if (loading) {
        fetchTestimoni({});
        setLoading(false);
    }
  }, [loading]);

  return (
    <>
      <div className="flex items-center justify-start">
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
          Testimonial
        </h1>
      </div>
        <DataTableTestimonial
          data={geTestimoni?.testimonials || []}
          loading={loading}
        />
    </>
  );
};
