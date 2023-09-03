import { Gallery } from "@/components/gallery"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/title"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { env } from '@/lib/env.mjs'
import { resolvePlayerId } from "@/lib/getPlayer"

async function getGallery(userId: string, page: string) {

  const res = await fetch(`${env.STRAPI_URL}/personal-galleries?filters[players][userId][$eq]=${userId}&pagination[page]=${page}&pagination[pageSize]=9&pagination[withCount]=true&populate=*&sort=name`, {
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

export default async function Page({ params }: { params: { page: [string] } }) {

  const { userId: id } = auth()

  if (!id) return null

  const userId = await resolvePlayerId(id)

  const page = params.page === undefined ? '1' : params.page[0]

  const gallery = await getGallery(userId, page)

  return (
    <div>
      <Title type="h1">Personal Gallery</Title>
      <Gallery images={gallery.data} />
      <div className="mt-16 flex flex-row items-center justify-center">
        {parseInt(page) > 1 ? (
          <Link href={`/dashboard/personal-gallery/${parseInt(page) - 1}`}>
            <Button className="mx-4">Prev</Button>
          </Link>
        ) : (
          <Button className="mx-4" disabled variant="link">Prev</Button>
        )}
        {parseInt(page) < gallery.meta.pagination.pageCount ? (
          <Link href={`/dashboard/personal-gallery/${parseInt(page) + 1}`}>
            <Button className="mx-4">Next</Button>
          </Link>
        ) : (
          <Button className="mx-4" disabled variant="link">Next</Button>
        )}
      </div>
    </div>
  )
}
