import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from "@/components/ui/separator"
import MenuButton from '../ui/menu-button'
import { auth } from '@clerk/nextjs'
import { getPlayer } from '@/lib/getPlayer'

export const Header = async () => {

  return (
    <>
      <header className="flex w-full flex-col p-4 shadow-white drop-shadow-lg dark:bg-black border-b border-gray-200 dark:border-gray-700">
        <div className="container flex flex-row items-center">
          <div className="grow text-3xl">
            <Link href="/">
              <span className="mr-6 font-body">ak</span>Alala's Keening
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <SignedIn>
              <GmDashboardLink />
              <Link href="/dashboard">
                <Button className="" variant="link">Dashboard</Button>
              </Link>
              <Separator orientation="vertical" className="text-muted-foreground h-4" />
              <Link href="/dashboard/inbox">
                <Button className="" variant="link">Inbox</Button>
              </Link>
              <Separator orientation="vertical" className="text-muted-foreground h-4" />
              <Link href="/dashboard/news-stories">
                <Button className="" variant="link">News Stories</Button>
              </Link>
              <Separator orientation="vertical" className="text-muted-foreground h-4" />
              <Link href="/dashboard/contacts">
                <Button className="" variant="link">Contacts</Button>
              </Link>
              <Separator orientation="vertical" className="text-muted-foreground h-4" />
              <Link href="/dashboard/personal-gallery">
                <Button className="" variant="link">Personal Gallery</Button>
              </Link>
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

const GmDashboardLink = async () => {

  const { userId } = auth()
  if (!userId) return null

  const resPlayer = await getPlayer(userId)
  const player = resPlayer.data[0].attributes

  if (player.role !== 'gm') return null

  return (

    <>
      <Link href="/gm">
        <Button className="" variant="link">GM Dashboard</Button>
      </Link>
      <Separator orientation="vertical" className="text-muted-foreground h-4" />
    </>

  )
}
