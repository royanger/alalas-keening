import { Title } from '@/components/ui/title'
import { auth } from '@clerk/nextjs/server'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { DateTime } from 'luxon'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import { env } from '@/lib/env.mjs'
import { resolvePlayerId } from '@/lib/getPlayer'

async function getInbox(userId: string) {

  const res = await fetch(`${env.STRAPI_URL}/gm-notes?filters[player][userId][$eq]=${userId}&sort=publishedAt:desc`, {
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

const determineStatus = (replied: string, publishedAt: string) => {

  if (replied && Math.floor(DateTime.now().toSeconds() -
    DateTime.fromISO(publishedAt).toSeconds()) < 604800) return (
      <div>
        <Badge className={clsx(
          "bg-orange-600 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-400 mb-4"
        )}>
          New
        </Badge>
        <Badge className="bg-green-700 hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-400">
          Replied
        </Badge>

      </div>
    )
  if (replied) return (
    <div>
      <Badge className="bg-green-700 hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-400">
        Replied
      </Badge>
    </div>
  )

  if (Math.floor(DateTime.now().toSeconds() -
    DateTime.fromISO(publishedAt).toSeconds()) < 604800) {
    return (
      <Badge className={clsx(
        "bg-orange-600 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-400"
      )}>
        New
      </Badge>
    )

  }

  // note is not new and has not been replied to yet -- return empty message
  return null
}


export default async function Page() {

  const { userId: id } = auth()

  if (!id) return null

  const userId = await resolvePlayerId(id)
  const inbox = await getInbox(userId)

  return (
    <>
      <div>
        <Title type="h1">Inbox</Title>
        <Table className="mt-12">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[120px] text-center">Status</TableHead>
              {/* <TableHead className="text-right">Amount</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {inbox.data.map((message: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {message.attributes.type === 'message' && <FontAwesomeIcon icon={faFile} className="h-4 md:h-6 lg:h-8" />}
                    {message.attributes.type === 'video' && <FontAwesomeIcon icon={faFileVideo} className="h-4 md:h-6 lg:h-8" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <Link href={`/dashboard/inbox/${message.attributes.slug}`}>
                        <Title type="h3" css="m-0 p-0 mt-2 ">
                          {message.attributes.regarding ?
                            message.attributes.regarding :
                            'No subject provided'}
                        </Title>
                      </Link>
                      <p><span className="font-bold">From:</span> {message.attributes.from}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{determineStatus(message.attributes.replied, message.attributes.publishedAt)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

      </div>
    </>
  )
}
