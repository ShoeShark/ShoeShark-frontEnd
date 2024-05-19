'use server'

import { cookies } from "next/headers"

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
