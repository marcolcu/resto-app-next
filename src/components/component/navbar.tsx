"use client";

import Link from "next/link";
import { useAppContext } from "@/app/provider";
import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";

export function Navbar() {
    const { state, dispatch } = useAppContext();
    const [isClient, setIsClient] = useState(false);

    // Ensure this code only runs on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCancelReservation = () => {
        dispatch({ carts: null, reservation: null });
    };

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            {isClient && (state?.carts || state?.reservation) ? (
                <span className="flex items-center justify-center">
                    <UtensilsIcon className="h-6 w-6" />
                    <span className="sr-only">Delicious Bites</span>
                </span>
            ) : (
                <Link href="/" className="flex items-center justify-center" prefetch={false}>
                    <UtensilsIcon className="h-6 w-6" />
                    <span className="sr-only">Delicious Bites</span>
                </Link>
            )}
            <nav className="ml-auto flex gap-4 sm:gap-6">
                {isClient && (state?.carts || state?.reservation) ? (
                    <Button
                        onClick={handleCancelReservation}
                        className="text-sm font-medium hover:underline underline-offset-4"
                    >
                        Cancel Reservation
                    </Button>
                ) : (
                    <>
                        <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Home
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            About
                        </Link>
                        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                            Contact
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

function UtensilsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
    )
}