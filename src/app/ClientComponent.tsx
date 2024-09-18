"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/component/navbar";
import { Footer } from "@/components/component/footer";

export const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};
