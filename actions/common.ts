'use server'

import { fetchWithAuth, log } from "utils/util"
import { getToken } from "./token"

const BaseUrl = process.env.NEXT_PUBLIC_SERVICE_BASE_URL

export const uploadImage = async (formData: FormData) => {
    // headers.append('Content-type', 'application/json')
    const res = await fetchWithAuth(`${BaseUrl}/oss/upload`, {
        method: 'POST',
        body: formData,
        redirect: 'follow',
    })
    const data = await res.json()
    log('upload res', data)
    return data
}
