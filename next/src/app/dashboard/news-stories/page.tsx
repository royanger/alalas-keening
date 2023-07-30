
import * as React from 'react'
import { Title } from "@/components/ui/title"
import { auth } from "@clerk/nextjs"
import Image from 'next/image'
import { Markdown } from '@/components/markdown'
import clsx from 'clsx'
import { env } from '@/lib/env.mjs'

async function getNews() {
  const res = await fetch(`${env.STRAPI_URL}/new-stories?populate[reporter][populate]=image&populate=image&sort=publishedAt:desc`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch player')
  }
  return res.json()
}

interface IColoursProps {
  [key: string]: string
}

const colours: IColoursProps = {
  orange: 'border-orange-500',
  blue: 'border-blue-500',
  gray: 'border-gray-500',
  red: 'border-red-500',
  green: 'border-green-500',
  indigo: 'border-indigo-500'
}

export default async function Page() {

  const { userId } = auth()
  if (!userId) return null

  const news = await getNews()

  return (
    <>
      <div>
        <Title type="h1">News Archive</Title>
        <div className="mt-12">
          {news.data.map((story: any) => {
            return (
              <div className="mb-12 grid grid-cols-1 md:grid-cols-8 gap-8" key={story.id}>
                <div className="md:col-span-2">
                  <Image
                    src={story.attributes.image.data.attributes.formats.small.url}
                    alt={story.attributes.reporter.data.attributes.name}
                    width={story.attributes.image.data.attributes.width}
                    height={story.attributes.image.data.attributes.height}
                    className="border border-gray-500 dark:border-gray-600 rounded-lg"
                  />
                </div>
                <div className="md:col-span-6 flex flex-col justify-center">
                  <div>
                    <Title type="h3" css={clsx(
                      colours[story.attributes.accentColour],
                      "border-b-8 mt-0 pt-0"
                    )}>
                      {story.attributes.reporter.data.attributes.name}
                    </Title>
                    < Markdown>
                      {story.attributes.byline}
                    </Markdown>
                    <p>{story.attributes.reporter.data.attributes.feed}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
