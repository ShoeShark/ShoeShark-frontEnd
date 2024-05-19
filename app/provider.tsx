"use client";

import { NextUIProvider } from "@nextui-org/react";
import Layout from "components/Layout";
import { RainbowKitProvider, darkTheme, createAuthenticationAdapter, RainbowKitAuthenticationProvider, AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { ReactNode } from "react";
import { log } from "utils/util";
import { avalancheFuji } from "viem/chains";
import { wagmiConfig } from "utils/config";
import { walletClient } from "config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('unauthenticated')

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            setAuthStatus('authenticated')
        }
    }, [])

    const authenticationAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            const account = await walletClient.getAddresses()
            log('address is', account)
            const data = (await (await fetch(`http://150.158.25.115:8080/shoe-shark/api/v1/auth/nonce/${account}`)).json())
            let nonce = data.data.nonce
            return nonce
        },
        createMessage: ({ nonce, address, chainId }) => {
            log('createMessage', nonce)
            return nonce
        },
        getMessageBody: ({ message }) => {
            log('getMessageBody', message)
            return message
        },
        verify: async ({ message, signature }) => {
            log('verify')
            const account = await walletClient.getAddresses()
            const b = {
                accountAddress: account,
                signature: signature,
            }
            let verified = false
            setAuthStatus('loading')
            try {
                const res = await fetch(`http://150.158.25.115:8080/shoe-shark/api/v1/auth/nonce/verify`, {
                    method: 'POST',
                    body: JSON.stringify(b),
                })
                const data = await res.json()
                log('data1', data)
                const token = data.data.token
                log('token', token)
                window.localStorage.setItem('token', token)
                setAuthStatus('authenticated')
                verified = true
            } catch (err) {
                log('verify error', err)
                window.localStorage.removeItem('token')
                setAuthStatus('unauthenticated')
            }
            log('verify result', verified)
            return verified
        },
        signOut: async () => {
            setAuthStatus('unauthenticated')
            window.localStorage.removeItem('token')
        },
    });

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <NextUIProvider>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitAuthenticationProvider
                        adapter={authenticationAdapter}
                        status={authStatus}
                    >
                        <RainbowKitProvider
                            theme={darkTheme()}
                            initialChain={avalancheFuji}>
                            <Layout>
                                {children}
                            </Layout>
                        </RainbowKitProvider>
                    </RainbowKitAuthenticationProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </NextUIProvider >
    );
}
