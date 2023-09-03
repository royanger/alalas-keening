import { PlayerCard } from '@/components/player-card';
import { ChurnDisplay } from '@/components/churn';
import { env } from '@/lib/env.mjs'
import Image from 'next/image';

async function getPlayers() {

  const res = await fetch(`${env.STRAPI_URL}/players?filters[role][$eq]=player&populate=profileImageWide&sort=order`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch gallery')
  }

  return res.json()
}

async function getGM() {

  const res = await fetch(`${env.STRAPI_URL}/players?filters[role][$eq]=gm&populate=profileImageWide&sort=order&pagination[pageSize]=1&pagination[page]=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${env.STRAPI_TOKEN}`
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch gallery')
  }

  return res.json()
}
export default async function Players() {

  const res = await getPlayers()

  const gm = await getGM()

  return (
    <div className="flex h-full flex-col justify-between p-8">
      <div className="grid grid-cols-5">
        <div className="bg-red text-white">
          {/* Following/Sub messages here */}
        </div>
        <div className="col-span-3 flex flex-row justify-center text-white">
          <h1>
            <Image alt="The Expanse: Alala's Keening" src="https://res.cloudinary.com/diahnvqxo/image/upload/v1689528049/the-expanse-rpg-logo_yodkbi.png" width={256} height={61} />
          </h1>
        </div>

        <ChurnDisplay ablyKey={env.ABLY_API_KEY} />
      </div>

      <div className="grid grid-cols-3 gap-11">
        <PlayerCard
          gm={true}
          name={gm.data[0].attributes.name}
          twitter={gm.data[0].attributes.twitter}
          pronouns={gm.data[0].attributes.pronouns}
          image={gm.data[0].attributes.profileImageWide.data.attributes.url}
        />
        {res.data.map((player: any) => {
          return (
            <PlayerCard
              key={player.id}
              name={player.attributes.name}
              twitter={player.attributes.twitter}
              twitch={player.attributes.twitch}
              characterName={player.attributes.character}
              pronouns={player.attributes.pronouns}
              image={player.attributes.profileImageWide.data.attributes.url}
            />
          );
        })}
      </div>
    </div>
  );
}
