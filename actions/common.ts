'use server'

import { getToken } from "./token"

export const authHeaders = async () => {
  const token = await getToken()
  const headers = new Headers()
  headers.append('Authorization', token)
  return headers
}
