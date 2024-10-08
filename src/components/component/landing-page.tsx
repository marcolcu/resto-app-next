"use client";

import Link from "next/link";
import { useGetAllMicrosite } from "@/services/useMicrositeService";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useGeTestimoni } from "@/services/useTestimoniService";

type Point = {
  title: string;
  description: string;
};

type Microsite = {
  content: string;
  description: string;
  id: number;
  image: string;
  points: Point[];
  tipe_section: "header" | "signature" | "customer";
};

export function LandingPage() {
  const { state } = useAppContext();
  const { fetchMicrosites, microsites } = useGetAllMicrosite();
  const { fetchTestimoni, geTestimoni } = useGeTestimoni();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (state && isClient) {
      fetchMicrosites({});
      fetchTestimoni({});
    }
  }, [state, isClient]);

  if (!microsites || !isClient) {
    return (
      <main className="flex-1">
        {/* Header Section Skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-6 lg:grid lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 lg:text-left">
                  <Skeleton className="h-10 w-3/4 sm:w-full lg:w-3/4 xl:w-2/3" />
                  <Skeleton className="h-6 w-full sm:w-full lg:w-4/5" />
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              <Skeleton className="mx-auto aspect-video rounded-xl sm:w-full lg:aspect-[3/1] lg:order-last" />
            </div>
          </div>
        </section>

        {/* Signature Section Skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Skeleton className="h-8 w-2/3 sm:w-1/2 lg:w-1/3" />
              <Skeleton className="h-6 w-full sm:w-4/5 lg:w-3/5" />
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Skeleton className="mx-auto aspect-video rounded-xl sm:w-full lg:order-last" />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {[...Array(3)].map((_, index) => (
                    <li key={index}>
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full sm:w-4/5" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Section Skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Skeleton className="h-8 w-2/3 sm:w-1/2 lg:w-1/3" />
              <Skeleton className="h-6 w-full sm:w-4/5 lg:w-3/5" />
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full sm:w-4/5" />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Filter microsites based on type with explicit type
  const headerSection = microsites.microsites.find(
    (m: Microsite) => m.tipe_section === "header"
  );
  const signatureSection = microsites.microsites.find(
    (m: Microsite) => m.tipe_section === "signature"
  );
  const customerSection = microsites.microsites.find(
    (m: Microsite) => m.tipe_section === "customer"
  );

  return (
    <main className="flex-1">
      {headerSection && (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-6 lg:grid lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 lg:text-left">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    {headerSection.content}
                  </h1>
                  <p className="text-muted-foreground md:text-xl mx-auto">
                    {headerSection.description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Link
                    href="/menu"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    View Menu
                  </Link>
                  <Link
                    href="/reservation"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Book a Table
                  </Link>
                </div>
              </div>
              <img
                src={headerSection.image || "/placeholder.svg"}
                width="550"
                height="550"
                alt="Restaurant Interior"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-[3/1]"
              />
            </div>
          </div>
        </section>
      )}
      {signatureSection && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Our Delectable Menu
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  From classic dishes to innovative creations, our menu features
                  a wide variety of options to satisfy every palate.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src={signatureSection.image || "/placeholder.svg"}
                width="550"
                height="310"
                alt="Menu Item"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  {signatureSection.points.map(
                    (point: Point, index: number) => (
                      <li key={index}>
                        <div className="grid gap-1">
                          <h3 className="text-xl font-bold">{point.title}</h3>
                          <p className="text-muted-foreground">
                            {point.description}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
      {geTestimoni?.testimonials && geTestimoni.testimonials.length > 0 && (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Customer Testimonials
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Here’s what our customers are saying about us:
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                {geTestimoni.testimonials
                  .filter((testimonial: any) => testimonial.active) // Filter active testimonials
                  .map((testimonial: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center space-y-4"
                    >
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">
                          &quot;{testimonial.description}&quot;
                        </h3>
                        <p className="text-muted-foreground">
                          - {testimonial.customer}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
