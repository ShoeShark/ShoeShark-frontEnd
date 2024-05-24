import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Provider from "./provider";
import "assets/global.css";
import '@rainbow-me/rainbowkit/styles.css';
const urban = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Shoe-Shark",
    description: "A decentralized platform for sharing travel inspirations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={urban.className}
            >
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}

