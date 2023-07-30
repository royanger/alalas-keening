import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { faChevronLeft, faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Markdown } from "@/components/markdown"
import { env } from '@/lib/env.mjs'

async function getNote(slug: string) {

  const res = await fetch(`${env.STRAPI_URL}/gm-notes?filters[slug][$eq]=${slug}&populate[0]=attachments`, {
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

export default async function Page({ params }: { params: { slug: [string] } }) {

  const { userId } = auth()
  if (!userId) return null

  const note = await getNote(params.slug[0])

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center mt-8 pb-3 lg:pb-0">
        <Link href="/dashboard/inbox">
          <Button className="relative mb-4 lg:mb-0"> <FontAwesomeIcon icon={faChevronLeft} className="mr-3 top-[2px] relative" />Back </Button>
        </Link>
        <p className="ml-3">{note.data[0].attributes.to}: {note.data[0].attributes.regarding}</p>
      </div>
      <div className="border border-gray-300 dark:border-gray-700 mt-6">
        <div className="grid grid-cols-12 gap-2 p-8">
          <p className="col-span-3 md:col-span-2 lg:col-span-1">Subject:</p>
          <p className="col-span-9 md:col-span-10 lg:col-span-11">{note.data[0].attributes.regarding}</p>
          <p className="col-span-3 md:col-span-2 lg:col-span-1">To:</p>
          <p className="col-span-9 md:col-span-10 lg:col-span-11" >{note.data[0].attributes.to}</p>
          <p className="col-span-3 md:col-span-2 lg:col-span-1">From:</p>
          <p className="col-span-9 md:col-span-10 lg:col-span-11">{note.data[0].attributes.from}</p>
        </div>
        <div className="m-8 p-9 border border-gray-200 dark:border-gray-800">

          <Markdown>{note.data[0].attributes.body}</Markdown>
        </div>
        <div className="m-8 flex flex-col lg:flex-row">
          <div className="h-16 bg-primary rounded text-primary-foreground flex items-center justify-center w-40 mr-2">Attachments:</div>
          {note.data[0].attributes.attachments.data ? (
            note.data[0].attributes.attachments.data.map((attachment: any) => {
              return (
                <Link
                  key={attachment.id}
                  href={attachment.attributes.url}
                  target="_blank"
                  className="h-16 border border-primary hover:bg-muted flex items-center justify-center mx-2 rounded p-4 my-4 lg:my-0 grow-0"
                >
                  <FontAwesomeIcon icon={faPaperclip} className="mr-2" />
                  {attachment.attributes.name.split(".")[0]}
                </Link>
              )
            })
          ) : (<div className="text-lg h-16 flex items-center justify-center">No attachments</div>)}
        </div>
      </div>
      {note.data[0].attributes.replied && (
        <div className="border border-gray-300 dark:border-gray-700 mt-16">
          <div className="grid grid-cols-12 gap-2 p-8">
            <p className="col-span-1">Subject:</p>
            <p className="col-span-11">{note.data[0].attributes.replyRegarding}</p>
            <p className="col-span-1">To:</p>
            <p className="col-span-11" >{note.data[0].attributes.replyTo}</p>
            <p className="col-span-1">From:</p>
            <p className="col-span-11">{note.data[0].attributes.replyFrom}</p>
          </div>
          <div className="m-8 p-9 border border-gray-200 dark:border-gray-800">

            <Markdown>{note.data[0].attributes.replyBody}</Markdown>
          </div>
        </div>)}
    </div>
  )
}
