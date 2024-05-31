'use server'

import { fetchWithAuth } from "../utils/util"

const BaseUrl = process.env.NEXT_PUBLIC_SERVICE_BASE_URL

export const getMintRaw = async () => {
    const res = await fetchWithAuth(`${BaseUrl}/contract/nft/mint/white`, { cache: 'no-store' })
    const data = await res.json()
    return data
}

