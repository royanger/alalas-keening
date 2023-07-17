import { Breadcrumbs } from '@/components/header/breadcrumbs';
import { Header } from '@/components/header/header';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/title';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { faInbox, faBox, faSignal, faImages, faBook, faTablet, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faImages as faImages2 } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Footer } from '@/components/footer/footer';
import { getPlayer } from '@/lib/getPlayer';
import { Impersonating } from '@/components/header/impersonating';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  const { userId } = auth()
  if (!userId) return null

  const res = await getPlayer(userId)
  const player = res.data[0].attributes


  return (
    <>
      {player.isImpersonating &&
        <Impersonating character={player.character} />}
      <Header />
      <Breadcrumbs />
      <article className="flex flex-row justify-center pb-52">
        <div className="container grid grid-cols-10">
          <div className="col-span-2">
            <Title type="h2" css="text-2xl md:text-2xl">{player.character}</Title>
            <ul>
              <li>{player.name} ({player.pronouns})</li>
              <li>{player.race}</li>
              <li>{player.job}</li>
            </ul>
            <div className="mt-8 flex flex-col">
              <Link className="mb-4" href="/dashboard"><Button><FontAwesomeIcon icon={faTablet} className="mr-2" />Dashboard</Button></Link>
              <Link className="mb-4" href="/dashboard/biography"><Button><FontAwesomeIcon icon={faBook} className="mr-2" />Biography</Button></Link>
              <Link className="mb-4" href="/dashboard/gallery"><Button><FontAwesomeIcon icon={faImages} className="mr-2" />Crew Gallery</Button></Link>
              <Link className="mb-4" href="/dashboard/inbox"><Button><FontAwesomeIcon icon={faInbox} className="mr-2" />Inbox</Button></Link>
              <Link className="mb-4" href="/dashboard/contacts"><Button><FontAwesomeIcon icon={faUsers} className="mr-2" />Contacts</Button></Link>
              <Link className="mb-4" href="/dashboard/personal-gallery"><Button><FontAwesomeIcon icon={faImages2} className="mr-2" />Personal Gallery</Button></Link>
              <Link className="mb-4" href="/dashboard/news-stories"><Button><FontAwesomeIcon icon={faSignal} className="mr-2" />News Stories</Button></Link>
              <Link className="mb-4" href="/dashboard/resources"><Button><FontAwesomeIcon icon={faBox} className="mr-2" />Resources</Button></Link>


            </div>
          </div>
          <div className="col-span-8">
            {children}
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}

