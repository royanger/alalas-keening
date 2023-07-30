import * as React from 'react'
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from "@/components/ui/separator"
import MenuButton from '../ui/menu-button'
import { auth } from '@clerk/nextjs'
import { getPlayer } from '@/lib/getPlayer'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Title } from '@/components/ui/title'
import { MobileProfileButton } from './mobile-profile-button'
import { faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Header = async () => {

  const gm = await generateGMLink()
  const menu = [
    ...gm!,
    { name: "Dashboard", link: "/dashboard", topMenu: true },
    { name: "Biography", link: "/dashboard/biography", topMenu: false },
    { name: "Crew Gallery", link: "/dashboard/gallery", topMenu: false },
    { name: "Inbox", link: "/dashboard/inbox", topMenu: true },
    { name: "Contacts", link: "/dashboard/contacts", topMenu: true },
    { name: "Personal Gallery", link: "/dashboard/personal-gallery", topMenu: true },
    { name: "News Stories", link: "/dashboard/news-stories", topMenu: true },
    { name: "Resources", link: "/dashboard/resources", topMenu: false }
  ]

  return (
    <>
      <header className="flex w-full flex-col p-4 shadow-white drop-shadow-lg dark:bg-black border-b border-gray-200 dark:border-gray-700 fixed xl:relative z-50">
        <div className="container flex flex-row items-center">
          <div className="grow text-3xl">
            <Link href="/">
              <span className="mr-6 font-body">ak</span>Alala's Keening
            </Link>
          </div>

          <Sheet>
            <SheetTrigger className="xl:hidden col-span-9 md:col-span-10 lg:n"><FontAwesomeIcon icon={faBars} className="h-6 w-auto" /></SheetTrigger>
            <SheetContent className="w-full sm:max-w-full" side='right'>
              <SheetHeader className="mt-12">
                <SheetTitle>
                  <Title type="h2" css="text-2xl">Menu</Title>
                  <Separator orientation="horizontal" className="text-muted-foreground " />
                </SheetTitle>
                <SheetDescription>
                  <div className="flex-row flex my-6 gap-4">
                    <ThemeToggle variant="default" />
                    <SignedIn>
                      <MobileProfileButton />
                      <SignOutButton>
                        <Button>
                          <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-2" />
                          <span>Sign Out</span>
                        </Button>
                      </SignOutButton>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button>Sign In</Button>
                      </SignInButton>
                    </SignedOut>

                  </div>
                  <div>
                    <ul>
                      {menu.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <li>
                              <Link href={item.link}>
                                <SheetClose asChild>
                                  <Button variant="link" className="text-lg my-2">{item.name}</Button>
                                </SheetClose>
                              </Link>
                              <Separator orientation='horizontal' className="text-muted-foreground ml-3" />
                            </li>

                          </React.Fragment>
                        )
                      })}
                    </ul>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <div className="flex-row items-center hidden xl:flex">
            <SignedIn>

              {menu.map((item, index) => {
                if (item.topMenu === false) return null
                return (
                  <React.Fragment key={index}>
                    <Link href={item!.link}>
                      <Button className="" variant="link">{item!.name}</Button>
                    </Link>
                    <Separator orientation="vertical" className="text-muted-foreground h-4" />
                  </React.Fragment>
                )
              })}
            </SignedIn>
            <div>
              <SignedOut>
                <Button>
                  <SignInButton mode="modal" />
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-row items-center ml-2">
                  <MenuButton />
                </div>
              </SignedIn>
            </div>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

const generateGMLink = async () => {

  const { userId } = auth()
  if (!userId) return []

  const resPlayer = await getPlayer(userId)
  const player = resPlayer.data[0].attributes

  if (player.role !== 'gm') return []

  return [{ name: "GM Dashboard", link: '/gm', topMenu: true }]
}
