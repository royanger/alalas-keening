import Link from "next/link"
import { Button } from "../ui/button"
import { faTwitter, faTwitch, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Footer = () => {
  return (
    <div className="w-full h-24 border-t border-t-gray-200 fixed bottom-0 bg-primary text-primary-foreground">
      <div className="container flex flex-row h-full">
        <div className="flex items-center grow">
          <ul className="flex flex-row text-primary-foreground">

            <Link href="/dashboard"><Button variant="link" className="text-primary-foreground">Dashboard</Button></Link>
            <Link href="/dashboard/biography"><Button variant="link" className="text-primary-foreground">Biography</Button></Link>
            <Link href="/dashboard/gallery"><Button variant="link" className="text-primary-foreground">Crew Gallery</Button></Link>
            <Link href="/dashboard/inbox"><Button variant="link" className="text-primary-foreground">Inbox</Button></Link>
            <Link href="/dashboard/contacts"><Button variant="link" className="text-primary-foreground">Contacts</Button></Link>
            <Link href="/dashboard/personal-gallery"><Button variant="link" className="text-primary-foreground">Personal Gallery</Button></Link>
            <Link href="/dashboard/news-stories"><Button variant="link" className="text-primary-foreground">News Stories</Button></Link>
            <Link href="/dashboard/resources"><Button variant="link" className="text-primary-foreground">Resources</Button></Link>
          </ul>
        </div>
        <div className="flex items-center">
          <ul className="flex flex-row space-x-4">
            <li><Link href="https://twitter.com/royanger" target="_blank">
              <Button variant="outline" className="bg-primary-foreground text-primary">
                <FontAwesomeIcon icon={faTwitter} className="w-auto h-5" />
              </Button>
            </Link></li>
            <li><Link href="https://github.com/royanger" target="_blank">
              <Button variant="outline" className="bg-primary-foreground text-primary">
                <FontAwesomeIcon icon={faGithub} className="w-auto h-5" />
              </Button>
            </Link></li>
            <li><Link href="https://www.twitch.tv/jacobmgevans" target="_blank">
              <Button variant="outline" className="bg-primary-foreground text-primary">
                <FontAwesomeIcon icon={faTwitch} className="w-auto h-5" />
              </Button>
            </Link></li>


          </ul>
        </div>
      </div>
    </div>
  )
}
