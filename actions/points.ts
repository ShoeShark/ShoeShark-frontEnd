'use server'

import { fetchWithAuth } from "../utils/util"

const BaseUrl = process.env.NEXT_PUBLIC_SERVICE_BASE_URL

export const pointsLog = async () => {
    const res = await fetchWithAuth(`${BaseUrl}/points/log`, { cache: 'no-store' })
    const data = await res.json()
    return data
}

export const signIn = async () => {
    const res = await fetchWithAuth(`${BaseUrl}/points/signIn`)
    const data = await res.json()
    return data
}

export const getPoints = async () => {
    const res = await fetchWithAuth(`${BaseUrl}/points/account`)
    const data = await res.json()
    return data
}

export const addPublishPoint = async () => {
    const res = await fetchWithAuth(`${BaseUrl}/points/add/publish/content`)
    const data = await res.json()
    return data
}
