"use client";

import React, {useEffect, useState} from "react";
import {IconArrowLeft, IconBrandTabler, IconInfoCircle, IconServer, IconToolsKitchen2,} from "@tabler/icons-react";
import {cn} from "@/lib/utils";
import {Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar";
import {Dashboard} from "@/app/admin/dashboard/Dashboard";
import {Microsite} from "@/app/admin/microsite/Microsite";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {useAppContext} from "../provider";
import {useRouter} from "next/navigation";
import {MicrositeTabsDemo} from "./microsite/MicrositeTabs";
import {Menu} from "./menu/Menu";
import {About} from "@/app/admin/about/About";

export function Admin() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { state, dispatch } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure that the component is rendered on the client side only
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    // Prevent rendering on the server side to avoid hydration issues
    return null;
  }

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
    return initials;
  };

  const links = [
    {
      label: "Dashboard",
      icon: (
          <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      ),
      page: "dashboard",
    },
    {
      label: "Microsite",
      icon: (
          <IconServer className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      ),
      page: "microsite",
    },
    {
      label: "About",
      icon: (
          <IconInfoCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      ),
      page: "about",
    },
    {
      label: "Menu",
      icon: (
          <IconToolsKitchen2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      ),
      page: "menu",
    },
    {
      label: "Logout",
      icon: (
          <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      ),
      page: "logout",
    },
  ];

  const handleLinkClick = (page: string) => {
    if (page === "logout") {
      router.prefetch("/login?removeCookie=1");
      router.push("/login?removeCookie=1")
    } else {
      setCurrentPage(page);
      setOpen(false);
    }
  };

  return (
      <div
          className={cn(
              "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
              "h-screen"
          )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo/> : <LogoIcon/>}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                    <div
                        key={idx}
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700"
                        onClick={() => handleLinkClick(link.page)}
                    >
                      {link.icon}
                      <span className="ml-2 text-neutral-700 dark:text-neutral-200">
                    {link.label}
                  </span>
                    </div>
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                  link={{
                    label: state?.user?.name,
                    href: "#",
                    icon: (
                        <Avatar>
                          <AvatarFallback className="capitalize">
                            {getInitials(state?.user?.name)}
                          </AvatarFallback>
                        </Avatar>
                    ),
                  }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="flex flex-1">
          <div
              className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
            {(() => {
              switch (currentPage) {
                case "dashboard":
                  return <Dashboard/>;
                case "microsite":
                  return <MicrositeTabsDemo/>;
                case "menu":
                  return <Menu />;
                case "about":
                  return <About />;
                default:
                  return <Dashboard/>;
              }
            })()}
          </div>
        </div>
      </div>
  );
}

const Logo = () => (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
          className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
      <span className="font-medium text-black dark:text-white whitespace-pre">
      Restaurant
    </span>
    </div>
);

export const LogoIcon = () => (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
          className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
    </div>
);
