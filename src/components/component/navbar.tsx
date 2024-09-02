"use client";

import Link from "next/link";
import { useAppContext } from "@/app/provider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";

export function Navbar() {
    const router = useRouter();
    const { toast } = useToast();

    const { state, dispatch } = useAppContext();
    const [isClient, setIsClient] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Ensure this code only runs on the client side
    useEffect(() => {
        setIsClient(true);

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleCancelReservation = () => {
        toast({
            variant: "destructive",
            title: "Are you sure?",
            description: "Do you really want to cancel your reservation?",
            action: (
                <>
                    <ToastAction altText="Confirm" onClick={() => handleConfirmCancel(router)}>
                        Confirm
                    </ToastAction>
                </>
            ),
        });

        const handleConfirmCancel = (router: any) => {
            // Dispatch cancellation
            dispatch({ carts: null, reservation: null });

            // Show a success toast
            toast({
                title: "Reservation Cancelled",
                description: "Your reservation has been successfully cancelled.",
            });

            // Redirect
            router.prefetch('/');
            router.push('/');
        };
    };

    return (
        <header
            className={`px-4 lg:px-6 h-14 flex items-center transition-all duration-300 ${
                isScrolled ? "fixed top-0 left-0 w-full z-50 shadow backdrop-blur-2xl bg-opacity-70" : "bg-opacity-0"
            }`}
            style={{
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent'
            }}
        >
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
    );
}
