'use server'

import { getToken } from "./token"

export const authHeaders = async () => {
  const token = await getToken()
  return {
      'Authorization': token,
  }
}