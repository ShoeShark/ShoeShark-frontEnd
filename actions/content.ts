'use server'

import { fetchWithAuth, log } from "../utils/util"

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

export const contentList = async (p) => {
    const res = await fetchWithAuth(`${BaseUrl}/content/list`)
    const data = await res.json()
    return data
}

export const contentDetail = async (id: number | string) => {
    const res = await fetchWithAuth(`${BaseUrl}/content/${id}`, {})
    const data = await res.json()
    return data
}

export const contentSave = async (body: BodyInit) => {
    // const b = JSON.stringify(body)
    const res = await fetchWithAuth(`${BaseUrl}/content/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
        redirect: 'follow',
    })
    const data = await res.json()
    return data
}
