import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/provider";
import {ClientComponent} from "@/app/ClientComponent";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Resto App",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <Toaster />
            <div className="flex flex-col min-h-screen">
                <ClientComponent>{children}</ClientComponent>
            </div>
        </Providers>
        </body>
        </html>
    );
}
