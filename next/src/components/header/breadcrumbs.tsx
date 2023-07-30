'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faHashtag } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const capitalize = (string: string) => {
  const words = string.split("-")

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring((1))
  }

  return words.join(" ")
}


export const Breadcrumbs = () => {

  const pathname = usePathname().substring(1).split('/')

  return (
    <div className="flex-row justify-center hidden xl:flex">
      <div className="py-2 mb-8 container">
        <ul className="flex flex-row items-end relative">
          <li><FontAwesomeIcon icon={faHashtag} className='h-4 text-gray-800 dark:text-gray-200 mr-2 bottom-[-2px] relative' /></li>
          {pathname.map((path, index) => {

            return (
              <li key={index} className="flex flex-row relative">
                {index + 1 < pathname.length ? (
                  <Link href={`/${path}`} className="mr-2 underline cursor-pointer">
                    {capitalize(path)}
                  </Link>
                ) : (

                  <span className="mr-2 relative bottom-[-1px]">{capitalize(path)}</span>
                )
                }
                {index + 1 < pathname.length && (<FontAwesomeIcon icon={faChevronRight} className="h-4 text-gray-800 dark:text-gray-200 mr-2 bottom-[-4px] relative" />)}
              </li>
            )
          })
          }
        </ul>
      </div>
    </div >
  )
}
