import * as React from 'react'
import { Title } from "@/components/ui/title"
import { auth } from "@clerk/nextjs"
import Image from 'next/image'
import { getPlayer } from '@/lib/getPlayer'

export default async function Page() {

  const { userId } = auth()
  if (!userId) return null

  const resPlayer = await getPlayer(userId)
  const player = resPlayer.data[0].attributes

  return (
    <>
      <div>
        <Title type="h1">{player.character}</Title>
        <div className="mt-12">
          <Image
            src={player.profileImageWide.data.attributes.url}
            alt={player.character}
            width={player.profileImageWide.data.attributes.width}
            height={player.profileImageWide.data.attributes.height}
          />
        </div>
      </div>
    </>
  )
}
