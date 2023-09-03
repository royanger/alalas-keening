
import { env } from './env.mjs'

const fetchPlayer = async (userId: string) => {
  const res = await fetch(`${env.STRAPI_URL}/players?filters[userId][$eq]=${userId}&populate=profileImageWide&populate=impersonate`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch player')
  }

  return res.json()
}


export const getPlayer = async (userId: string) => {

  const res = await fetchPlayer(userId)

  // if there current user has a relation/impersonation set, then fetch that user and add 'gm' role
  if (res.data[0].attributes.impersonate.data) {
    const impersonatedPlayer = await fetchPlayer(res.data[0].attributes.impersonate.data.attributes.userId)
    impersonatedPlayer.data[0].attributes['role'] = "gm"
    impersonatedPlayer.data[0].attributes['isImpersonating'] = true
    return { ...impersonatedPlayer }
  }
  return res
}

export const resolvePlayerId = async (userId: string) => {
  const res = await fetchPlayer(userId)

  if (res.data[0].attributes.impersonate.data) {
    return res.data[0].attributes.impersonate.data.attributes.userId
  }

  return userId

}


