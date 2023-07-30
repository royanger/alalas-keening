import Link from 'next/link';
import { env } from '@/lib/env.mjs';
import { Header } from '@/components/header/header';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Title } from '@/components/ui/title';

type ListItemType = {
  name: string;
  href: string;
  info?: string;
};

const links = [
  {
    name: 'Game Master Screen',
    href: '/gm/screen',
    info: 'Tool to help managing games',
  },
  {
    name: 'Players',
    href: '/gm/obs/players',
    info: 'Just the Players, GM and Churn counter',
  },
  {
    name: 'Players + Map',
    href: '/gm/obs/players+map',
    info: 'Players, GM, Churn and the RP map',
  },
  {
    name: 'Newsfeed 1',
    href: '/gm/obs/newsfeed1',
    info: 'The current newsfeeds from the Sol System!',
  },
  {
    name: 'Newsfeed - 2',
    href: '/gm/obs/newsfeed2',
    info: 'Newsfeed with alternative layout/info',
  },
  {
    name: 'Newsfeed - 3',
    href: '/gm/obs/newsfeed3',
    info: 'Newsfeed with alternative layout/info',
  }
];


async function getPlayers() {

  const res = await fetch(`${env.STRAPI_URL}/players?populate=profileImage`, {
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

export default async function Page() {

  const players = await getPlayers()


  return (
    <>
      <Header />
      <div className="p-12 container">
        <Title type="h2">Screens</Title>
        <ul className="grid grid-cols-3 gap-6">
          {links.map((item, index) => {
            return (
              <Card className="w-full" key={index}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {item.info}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={item.href}><Button>Go</Button></Link>
                </CardFooter>
              </Card>
            )

          })}
        </ul>
        <Title type="h2" css="pt-12">Players</Title>
        <ul className="grid grid-cols-3 gap-6">
          {players.data.filter((player: any, index: number) => { return player.attributes.role === 'player' }).map((player: any, index: number) => {
            return (
              <Card className="w-full" key={index}>
                <CardHeader>
                  <CardTitle>{player.attributes.character}</CardTitle>
                </CardHeader>
                <CardContent>
                  {player.attributes.race} {player.attributes.job}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/gm/player/${player.attributes.slug}`}><Button>Display</Button></Link>
                </CardFooter>
              </Card>
              // />
            );
          })}
        </ul>

      </div>
      <div><pre>{JSON.stringify(players, null, 2)}</pre></div>
    </>
  );
};

const ListItem = ({ name, href, info }: ListItemType) => {
  return (
    <li className="rounded bg-blue-700 p-4 text-white">
      <p>
        <Link href={href} className="text-lg font-bold text-gray-200 underline">
          {name}
        </Link>
      </p>
      {info ? (<p>{info}</p>) : (
        <p>Player card for {name}</p>)}
    </li>
  );
}
