"use client"
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { createConfig } from 'wagmi'

export const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http()
})


