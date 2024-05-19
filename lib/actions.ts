'use server'

import { cookies } from "next/headers"
import { log } from "../utils/util"

const BaseUrl = process.env.NEXT_PUBLIC_SERVICE_BASE_URL

export const fetchAIPlan = async (formData) => {
    let a = `${process.env.NEXT_PUBLIC_TRAVEL_ASSISTANT_BASE_URL}/get_data`
    let result
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TRAVEL_ASSISTANT_BASE_URL}/get_data`, {
            method: 'POST',
            body: formData,
        })
        const data = await res.json()
        result = data
    } catch (err) {
        log('err', err)
    }
    return result
}

export const fetchNonce = async (account: string) => {
    const res = await fetch(`${BaseUrl}/auth/nonce/${account}`)
    const data = await res.json()
    return data.data.nonce
}

export const verify = async (p: object) => {
    // return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhkNDFjMDU3ZmQxYzc4ODA1QUFDMTJCMEE5NGE0MDVjMDQ2MUE2RkJiIiwiZXhwIjoxNzE2MzYwODk5fQ.VLG_V4lYiLKeqE6fGy85Jt2IeSZZ49CBwFWrfpWkKdI'
    const res = await fetch(`${BaseUrl}/auth/nonce/verify`, {
        method: 'POST',
        body: JSON.stringify(p),
    })
    const data = await res.json()
    const token = data.data.token
    return token
}

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

export const authHeaders = async () => {
    const token = await getToken()
    return {
        'Authorization': token,
    }
}

export const fetchContentList = async () => {
    const header = await authHeaders()
    const res = await fetch(`${BaseUrl}/content/list`, {
        headers: header,
    })
    const data = await res.json()
    return data
}
