"use client"
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { avalancheFuji } from 'viem/chains'

export const walletClient = createWalletClient({
    chain: avalancheFuji,
    transport: custom(window.ethereum!)
})

export const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http()
})
