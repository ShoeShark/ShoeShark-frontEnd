'use server'

import { cookies } from "next/headers"
import { Address } from "viem"

export const getToken = async () => {
    const c = cookies().get('token')
    if (c) {
        return c.value
    }
    return undefined
}

export const setToken = async (token: string) => {
    cookies().set('token', token)
}

export const removeToken = async () => {
    cookies().delete('token')
}

export const setCookieAddress = async (address: Address) => {
    cookies().set('address', address)
}

export const getCookieAddress = async () => {
    const c = cookies().get('address')
    if (c) {
        return c.value
    }
    return undefined
}

export const removeCookieAddress = async () => {
    cookies().delete('address')
}
