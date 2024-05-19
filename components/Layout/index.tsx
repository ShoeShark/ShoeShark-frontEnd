import React from "react";
import Header from 'components/Header'
import { Toaster } from "react-hot-toast";
import { ProgressBar } from "../ProgressBar";

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <ProgressBar />
                <main className="relative flex flex-col flex-1">{children}</main>
            </div>
            <Toaster />
        </>
    )
}

export default Layout;
