import { Title } from "@/components/ui/title"
import { auth } from "@clerk/nextjs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { env } from '@/lib/env.mjs'

async function getResources() {
  const res = await fetch(`${env.STRAPI_URL}/resources?populate=file`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch resources')
  }

  return res.json()
}

export default async function Page() {

  const { userId } = auth()
  if (!userId) return null

  const resources = await getResources()

  return (
    <div>
      <Title type="h1">Gallery</Title>
      <div>
        <Table className="mt-12">
          <TableHeader>
            <TableRow>
              <TableHead>Resource</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xl">

            {resources.data.map((resource: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{resource.attributes.name}</TableCell>
                  <TableCell className="text-right">
                    {resource.attributes.link &&
                      <Link href={resource.attributes.link} className={buttonVariants({ variant: "outline" })} target="_blank">
                        Visit <FontAwesomeIcon icon={faUpRightFromSquare} className="ml-3" />
                      </Link>
                    }
                    {resource.attributes.file.data && <Link href={resource.attributes.file.data.attributes.url} target="_blank"><Button variant="outline">Open</Button></Link>}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

      </div>
    </div>
  )
}
