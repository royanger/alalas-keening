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
    }
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
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch gallery')
  }

  return res.json()
}


export default async function PlayersMap() {

  const res = await getPlayers()

  const gm = await getGM()

  return (
    <div className="flex h-full flex-row justify-between gap-14 p-8">
      <div className="flex grow flex-col">
        <div className="flex flex-row">
          <PlayerCard
            gm={true}
            name={gm.data[0].attributes.name}
            twitter={gm.data[0].attributes.twitter}
            pronouns={gm.data[0].attributes.pronouns}
            image={gm.data[0].attributes.profileImageWide.data.attributes.url}
            width="small"
          />

          <div className="flex grow flex-col items-center text-white">
            <h1 className="mb-12">
              <Image alt="The Expanse: Alala's Keening" src="https://res.cloudinary.com/diahnvqxo/image/upload/v1689528049/the-expanse-rpg-logo_yodkbi.png" width={256} height={61} />
            </h1>
            {/* <div className="bg-red text-white">Following/Sub messages here</div> */}
          </div>
        </div>
        <div className="flex h-full flex-row items-end justify-between">
        </div>
      </div>

      <div className="grid grid-cols-2 gap-7">
        {/* <div></div> */}
        <div className="flex items-center justify-center">
          <ChurnDisplay ablyKey={env.ABLY_API_KEY} />
        </div>
        {res.data.map((player: any) => {
          return (
            <PlayerCard
              name={player.attributes.name}
              twitter={player.attributes.twitter}
              twitch={player.attributes.twitch}
              characterName={player.attributes.character}
              pronouns={player.attributes.pronouns}
              image={player.attributes.profileImageWide.data.attributes.url}
              width="small"
            />
          );
        })}
      </div>
    </div>
  );
}
