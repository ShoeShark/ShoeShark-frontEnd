"use client"
import { createWalletClient, custom } from 'viem'
import { avalancheFuji } from 'viem/chains'

export const walletClient = createWalletClient({
    chain: avalancheFuji,
    transport: custom(window.ethereum!)
})

