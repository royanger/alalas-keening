'use client'

import Image from 'next/image'
import * as Dialog from '@radix-ui/react-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { Title } from '@/components/ui/title'
import { Badge } from '@/components/ui/badge'
import { DateTime } from 'luxon'
import clsx from 'clsx'

interface IGalleryProps {
  images: []
}

export const Gallery = ({ images }: IGalleryProps) => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
      {images.map((item: any) => {
        return (
          <GalleryImage
            key={item.id}
            publishedAt={item.attributes.publishedAt}
            url={item.attributes.image.data.attributes.url}
            alt={item.attributes.alt}
            width={item.attributes.image.data.attributes.width}
            height={item.attributes.image.data.attributes.width}
            name={item.attributes.name ? item.attributes.name : item.attributes.title}
            caption={item.attributes.caption}
          />
        )
      })}
    </div>

  )
}

const GalleryImage = (
  { publishedAt, url, alt, height, width, name, caption }:
    { publishedAt: string, url: string, alt: string, width: number, height: number, name: string, caption?: string }
) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="relative">
          {caption && (
            <Title type="h3">{name}</Title>
          )}
          {Math.floor(DateTime.now().toSeconds() -
            DateTime.fromISO(publishedAt).toSeconds()) < 604800 &&
            <Badge className={clsx(
              caption ? 'top-16' : 'top-2',
              "absolute bg-orange-600 hover:bg-orange-700 dark:bg-orange-300 dark:hover:bg-orange-400 right-2"
            )}>
              New
            </Badge>
          }
          <Image src={url} alt={alt} width={width} height={height} />
          <div className="py-2 flex flex-row items-center justify-center relative">
            {caption ?
              (<p className="relative text-sm">
                {caption}</p>)
              :
              (<p className="relative text-sm">
                {name}</p>
              )}

          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <Dialog.Content className="rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] bg-white p-8">
            <Dialog.Title><div className="flex flex-row justify-center"><Title type="h3" css="text-gray-800">{name}</Title></div></Dialog.Title>
            <Dialog.Description className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">

              <Image src={url} alt={alt} width={width} height={height} />
            </Dialog.Description>

            <Dialog.Close className="flex items-center justify-center p-2 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground focus:ring-0">
              <FontAwesomeIcon icon={faX} className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>


  )
}

