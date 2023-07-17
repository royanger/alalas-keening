import { env } from '@/lib/env.mjs'

export const getNews = async () => {

  const res = await fetch(
    `${env.STRAPI_URL}/new-stories?populate[reporter][populate]=image&populate=image&sort=publishedAt:desc&filters[current][$eq]=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch gallery')
  }

  return res.json()
}


