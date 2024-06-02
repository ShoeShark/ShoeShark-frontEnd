'use server'

import { CONTENT_MANAGER } from "contracts/ContentManager"
import { fetchWithAuth, log } from "../utils/util"
import { formatBlockTimestamp } from "utils/format"
import { avalancheFuji } from "viem/chains"
import { readContract, createConfig, http } from '@wagmi/core'

const BaseUrl = process.env.NEXT_PUBLIC_SERVICE_BASE_URL

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

// --- fetch on chain

const config = createConfig({
    chains: [avalancheFuji],
    transports: {
        [avalancheFuji.id]: http(),
    },
})

const getJsonByHash = async (hash: string) => {
    const res = await fetch(`https://white-left-chameleon-515.mypinata.cloud/ipfs/${hash}`, {
        cache: "force-cache"
    })
    const { description, title, location } = await res.json()

    return {
        description,
        title,
        location
    }
}
export async function getContentByHash(hash: string) {
    const [{ author, timestamp }, { description, title, location }] = await Promise.all([
        readContract(config, {
            ...CONTENT_MANAGER,
            functionName: "getContentDetails",
            args: [hash]
        }),
        getJsonByHash(hash)
    ])

    return {
        accountAddress: author,
        createdAt: formatBlockTimestamp(timestamp),
        contentId: hash,
        title,
        location,
        description
    }
}

export async function getContentList(address?: string) {
    const hash_list = await readContract(config, {
        ...CONTENT_MANAGER,
        functionName: "getAllContent"
    })

    const list = await Promise.all(
        hash_list.map(getContentByHash)
    )

    if (address) {
        return list.filter(item => item.accountAddress == address)
    }

    return list
}
