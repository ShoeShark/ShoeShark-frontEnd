import React from "react";
import Header from 'components/Header'
import { Toaster } from "react-hot-toast";
import { ProgressBar } from "../ProgressBar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Layout = ({ children }) => {
    const path = usePathname();

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                {
                    path !== "/" ?
                        <div className="h-20"></div>
                        : null
                }
                <ProgressBar />
                <main className="relative flex flex-col flex-1">{children}</main>
            </div>
            <Toaster />
        </>
    )
}

export default Layout;
