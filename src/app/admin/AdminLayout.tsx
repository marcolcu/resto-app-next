"use client";

import React, { useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconServer,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {Dashboard} from "@/app/admin/dashboard/Dashboard";
import {Microsite} from "@/app/admin/microsite/Microsite";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export function Admin() {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");

    const links = [
        {
            label: "Dashboard",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "dashboard",
        },
        {
            label: "Microsite",
            icon: (
                <IconServer className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "microsite",
        },
        {
            label: "Logout",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            page: "logout",
        },
    ];

    const handleLinkClick = (page: string) => {
        if (page === "logout") {
            // Handle logout logic here
            console.log("Logging out...");
        } else {
            setCurrentPage(page);
            setOpen(false);
        }
    };

    return (
        <>
            <div
                className={cn(
                    "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                    "h-screen"
                )}
            >
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {links.map((link, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700"
                                        onClick={() =>
                                            handleLinkClick(link.page)
                                        }
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
                                    label: "Manu Arora",
                                    href: "#",
                                    icon: (
                                        <Avatar>
                                            <AvatarFallback className="capitalize">
                                                MA
                                            </AvatarFallback>
                                        </Avatar>
                                    ),
                                }}
                            />
                        </div>
                    </SidebarBody>
                </Sidebar>

                <div className="flex flex-1">
                    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
                        {(() => {
                            switch (currentPage) {
                                case "dashboard":
                                    return <Dashboard />;
                                case "microsite":
                                    return <Microsite />;
                                case "portfolios":
                                    return <Portfolios />;
                                case "profile":
                                    return <Profile />;
                                case "settings":
                                    return <Settings />;
                                default:
                                    return <Dashboard />;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </>
    );
}

const Services = () => <div className="flex flex-1">Services Content</div>;
const Portfolios = () => <div className="flex flex-1">Portfolios Content</div>;
const Profile = () => <div className="flex flex-1">Profile Content</div>;
const Settings = () => <div className="flex flex-1">Settings Content</div>;

const Logo = () => (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div
            className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
        <span className="font-medium text-black dark:text-white whitespace-pre">
            Acet Labs
        </span>
    </div>
);

const LogoIcon = () => (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div
            className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
    </div>
);