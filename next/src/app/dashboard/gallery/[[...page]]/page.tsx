import { Gallery } from "@/components/gallery"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/title"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { env } from '@/lib/env.mjs'

async function getGallery(page: string) {

  const res = await fetch(
    `${env.STRAPI_URL}/galleries?pagination[page]=${page}&pagination[pageSize]=9&pagination[withCount]=true&populate=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch gallery')
  }

  return res.json()
}

export default async function Page({ params }: { params: { page: [string] } }) {

  const { userId } = auth()
  if (!userId) return null

  const page = params.page === undefined ? '1' : params.page[0]

  const gallery = await getGallery(page)

  return (
    <div>
      <Title type="h1"> Crew Gallery</Title>
      <Gallery images={gallery.data} />
      <div className="mt-16 flex flex-row items-center justify-center">
        {parseInt(page) > 1 ? (
          <Link href={`/dashboard/gallery/${parseInt(page) - 1}`}>
            <Button className="mx-4">Prev</Button>
          </Link>
        ) : (
          <Button className="mx-4" disabled variant="link">Prev</Button>
        )}
        {parseInt(page) < gallery.meta.pagination.pageCount ? (
          <Link href={`/dashboard/gallery/${parseInt(page) + 1}`}>
            <Button className="mx-4">Next</Button>
          </Link>
        ) : (
          <Button className="mx-4" disabled variant="link">Next</Button>
        )}
      </div>
    </div>
  )
}
