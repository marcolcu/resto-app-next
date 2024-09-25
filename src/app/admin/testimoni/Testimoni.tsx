"use client";

import { useEffect, useState } from "react";
import { useGeTestimoni } from "@/services/useTestimoniService";
import { DataTableTestimonial } from "@/components/component/datatable-testimonial";

export const Testimoni = () => {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { fetchTestimoni, geTestimoni } = useGeTestimoni();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchTestimoni({});
      setLoading(false);
    }
  }, [isClient]);

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
