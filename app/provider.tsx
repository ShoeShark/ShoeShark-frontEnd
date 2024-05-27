"use client";

import { NextUIProvider } from "@nextui-org/react";
import Layout from "components/Layout";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { ReactNode } from "react";
import { avalancheFuji } from "viem/chains";
import { wagmiConfig } from "config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <NextUIProvider>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <RainbowKitProvider
                            initialChain={avalancheFuji}>
                            <Layout>
                                {children}
                            </Layout>
                        </RainbowKitProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </NextUIProvider >
    );
}
