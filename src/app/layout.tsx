import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/component/navbar";
import {Footer} from "@/components/component/footer";
import {Providers} from "@/app/provider";

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
            <div className="flex flex-col min-h-screen">
                <Navbar/>
                <main className="flex-grow">
                    {children}
                </main>
                <Footer/>
            </div>
        </Providers>
        </body>
        </html>
    );
}
