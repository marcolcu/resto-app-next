"use client";

import { useAppContext } from "@/app/provider";
import { useGetAbout } from "@/services/useAboutService";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type About = {
  id: number;
  description: string;
  tipe_section: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type AboutResponse = {
  abouts: About[];
  message: string;
};

export function AboutUsPage() {
  const { state } = useAppContext();
  const { fetchAbout, getAbout } = useGetAbout();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (state && isClient) {
      fetchAbout({});
    }
  }, [state, isClient]);

  if (!getAbout || !isClient) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <main className="flex-1 flex flex-col">
          {/* About Section Skeleton */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6">
              <Skeleton className="h-10 w-3/4 sm:w-1/2" />
              <Skeleton className="h-6 w-full sm:w-3/4 md:w-2/3" />
            </div>
          </section>

          {/* Mission Section Skeleton */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6">
              <Skeleton className="h-10 w-2/3 sm:w-1/3" />
              <Skeleton className="h-6 w-full sm:w-4/5 md:w-2/3" />
            </div>
          </section>

          {/* Values Section Skeleton */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6">
              <Skeleton className="h-10 w-2/3 sm:w-1/3" />
              <Skeleton className="h-6 w-full sm:w-4/5 md:w-2/3" />
            </div>
          </section>

          {/* Meet the Chefs Section Skeleton */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <Skeleton className="h-10 w-2/3 sm:w-1/3" />
              <Skeleton className="h-6 w-full sm:w-3/4" />

              <div className="grid w-full grid-cols-1 items-stretch justify-center md:grid-cols-2 gap-4 lg:gap-4 xl:gap-8">
                {/* Chef Skeleton */}
                {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 items-center">
                    <Skeleton className="h-40 w-40 rounded-full" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const aboutSection = getAbout.abouts.find(
    (m: About) => m.tipe_section === "about"
  );
  const missionSection = getAbout.abouts.find(
    (m: About) => m.tipe_section === "mission"
  );
  const valueSection = getAbout.abouts.find(
    (m: About) => m.tipe_section === "values"
  );
  const chefSection = getAbout.abouts.find(
    (m: About) => m.tipe_section === "chef"
  );

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="flex-1 flex flex-col">
        {aboutSection && (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  About Us
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {aboutSection?.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section Our Mission */}
        {missionSection && (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Mission
                </h2>
                <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {missionSection?.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section Our Values */}
        {valueSection && (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center md:gap-10 md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Values
                </h2>
                <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {valueSection?.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section Meet the Chefs */}
        {chefSection?.chefs && chefSection.chefs.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Meet the Chefs
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {chefSection?.description}
                </p>
              </div>
              <div className="grid w-full grid-cols-1 items-stretch justify-center md:grid-cols-2 gap-4 lg:gap-4 xl:gap-8">
                {chefSection.chefs.map((chef: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1.5 items-center"
                  >
                    <Image
                      src={chef.chef_image_url || "/placeholder.svg"}
                      width="180"
                      height="180"
                      alt="Avatar"
                      className="rounded-full overflow-hidden object-cover object-center"
                      style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                    />
                    <div className="space-y-0.5 text-center">
                      <h3 className="text-lg font-bold">{chef.chef_name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {chef.chef_position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
