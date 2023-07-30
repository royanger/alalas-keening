import * as React from 'react'
import { Title } from '@/components/ui/title'
import { auth } from '@clerk/nextjs'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Markdown } from '@/components/markdown'
import { Separator } from '@/components/ui/separator'
import { env } from '@/lib/env.mjs'
import { resolvePlayerId } from '@/lib/getPlayer'

async function getContacts(userId: string) {

  const res = await fetch(`${env.STRAPI_URL}/contacts?filters[players][userId][$eq]=${userId}&populate[image]=*&sort=name`, {
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

export default async function Page() {


  const { userId: id } = auth()

  if (!id) return null

  const userId = await resolvePlayerId(id)

  const contacts = await getContacts(userId)

  return (
    <>
      <div>
        <Title type="h1">Contacts</Title>
      </div>
      <div className="mt-12">
        {contacts.data.map((contact: any, index: number) => {

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex justify-center items-center">
                  <div className="flex items-center justify-center h-full w-56">
                    {contact.attributes.image.data ? (
                      <Image
                        src={contact.attributes.image.data.attributes.url}
                        alt={contact.attributes.name}
                        height={contact.attributes.image.data.attributes.height}
                        width={contact.attributes.image.data.attributes.width}

                      />
                    ) : (<FontAwesomeIcon icon={faUser} className="h-32 w-32" />)}
                  </div>
                </div>
                <div className='col-span-6'>
                  <Title type="h3">{contact.attributes.name}</Title>
                  <Markdown>{contact.attributes.info}</Markdown>
                </div>
              </div>
              {index + 1 < contacts.data.length && (<Separator className="my-8" />)}
            </React.Fragment>
          )
        })}

      </div>
    </>
  )
}
