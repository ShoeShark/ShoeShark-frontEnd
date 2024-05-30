'use server'

import { fetchWithAuth, log } from "../utils/util"

const BaseUrl = process.env.NEXT_PUBLIC_SERVICE_BASE_URL

export const fetchAIPlan = async (formData) => {
    let result
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TRAVEL_ASSISTANT_BASE_URL}/get_data`, {
            method: 'POST',
            body: formData,
            redirect: 'follow',
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

export const contentList = async (params?: Record<string, any>) => {
    const paramsStr = params ? new URLSearchParams(params).toString() : ""

    const res = await fetchWithAuth(`${BaseUrl}/content/list?${paramsStr}`)
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

export const contentEdit = async (body: BodyInit) => {
    // const b = JSON.stringify(body)
    const res = await fetchWithAuth(`${BaseUrl}/content/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
        redirect: 'follow',
    })
    const data = await res.json()
    return data
}

export const contentDelete = async (contentId: string) => {
    // const b = JSON.stringify(body)
    const res = await fetchWithAuth(`${BaseUrl}/content/${contentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
    })
    const data = await res.json()
    return data
}

export const commentSave = async (body: BodyInit) => {
    // const b = JSON.stringify(body)
    const res = await fetchWithAuth(`${BaseUrl}/content/comments`, {
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

export const commentList = async (contentId: string) => {
    const res = await fetchWithAuth(`${BaseUrl}/content/comments/${contentId}`)
    const data = await res.json()
    return data
}
