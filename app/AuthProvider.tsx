// context.js
import { AuthenticationStatus, RainbowKitAuthenticationProvider, createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { fetchNonce, verify } from 'actions/content';
import { getToken, removeToken, setToken } from 'actions/token';
import React from 'react';
import { log } from 'utils/util';
import { useAccount, useDisconnect } from 'wagmi';

// AuthProvider.js

export const AuthProvider = ({ children }) => {
    const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('unauthenticated')
    const { address } = useAccount()
    const {disconnect} = useDisconnect()

    useEffect(() => {
        init()
        log('addre', address)
    }, [address])

    const init = async () => {
        const token = await getToken()
        const s: AuthenticationStatus = token ? 'authenticated' : 'unauthenticated'
        setAuthStatus(s)
    }

    const authenticationAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            log('account', address)
            const nonce = await fetchNonce(address)
            return nonce
        },
        createMessage: ({ nonce, address, chainId }) => {
            return nonce
        },
        getMessageBody: ({ message }) => {
            return message
        },
        verify: async ({ message, signature }) => {
            log('verify')
            const b = {
                accountAddress: address,
                signature: signature,
            }
            let verified = false
            setAuthStatus('loading')
            try {
                const token = await verify(b)
                log('verify token', token)
                setToken(token)
                setAuthStatus('authenticated')
                verified = true
            } catch (err) {
                log('verify error', err)
                removeToken()
                setAuthStatus('unauthenticated')
                disconnect()
            }
            return verified
        },
        signOut: async () => {
            log('signout call')
            setAuthStatus('unauthenticated')
            removeToken()
        },
    });


    return (
        <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={authStatus}
        >
            {children}
        </RainbowKitAuthenticationProvider>
    );
};

