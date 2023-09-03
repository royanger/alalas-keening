import * as React from 'react'
import { Title } from "@/components/ui/title"
import { auth } from "@clerk/nextjs"
import { Markdown } from '@/components/markdown'
import { env } from '@/lib/env.mjs'
import { resolvePlayerId } from '@/lib/getPlayer'

async function getBiography(userId: string) {
  const res = await fetch(`${env.STRAPI_URL}/biographies?filters[player][userId][$eq]=${userId}&populate=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch biographies')
  }
  return res.json()
}

export default async function Page() {

  const { userId: id } = auth()

  if (!id) return null

  const userId = await resolvePlayerId(id)
  const resBio = await getBiography(userId)

  const bio = []
  for (let i = 0; i < resBio.data.length; i++) {
    bio.push(resBio.data[i].attributes.entry)
  }

  if (!resBio?.data[0]?.attributes) return (<p>No Biography present</p>)

  return (
    <>
      <div>
        <Title type="h1">{resBio.data[0].attributes.player.data.attributes.character}</Title>
        <div className="mt-12">
          <Markdown>{bio.join()}</Markdown>
        </div>
      </div>
    </>
  )
}
