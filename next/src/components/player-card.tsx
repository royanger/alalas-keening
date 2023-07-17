import clsx from 'clsx';
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CardProps = {
  name: string;
  twitter?: string;
  twitch?: string;
  pronouns: string;
  characterName?: string;
  image: string;
  width?: 'small' | 'large';
  gm?: boolean;
};

export const CharacterBar = ({
  gm = false,
  name,
  twitter,
  twitch,
  pronouns,
  width,
  characterName,
}: CardProps) => {

  if (width === 'small') {
    return (
      <div
        className={clsx(
          'mt-2 flex w-[300px] flex-col rounded-lg px-4 py-2 ',
          gm ? 'bg-white text-blue-800' : 'bg-blue-800 text-white'
        )}
      >
        <div className="flex grow items-center justify-center font-body text-xl font-extrabold">
          {gm ? 'Game Master' : characterName}
        </div>
        <div className="mt-1 flex flex-col items-center text-sm">
          <div className="">
            <span className="mr-2 font-body">Played by:</span>
            {name} ({pronouns})
          </div>

          <div className="flex flex-row items-center justify-center">
            {twitter && <TwitterCard twitter={twitter} gm={gm} height="h-4" />}
            {twitch && <TwitchCard twitch={twitch} gm={gm} height="h-4" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'mt-2 flex flex-row rounded-lg px-4 py-2',
        gm ? 'bg-white text-blue-800' : 'bg-blue-800 text-white'
      )}
    >
      <div className="flex grow items-center font-body text-2xl font-extrabold">
        {gm ? 'Game Master' : characterName}
      </div>
      <div className="flex flex-col items-end">
        <div className="">
          <span className="mr-2 font-body">Played by:</span>
          {name} ({pronouns})
        </div>
        <div className="flex flex-row items-center justify-center">
          {twitch && <TwitchCard twitch={twitch} gm={gm} height="h-6" />}
          {twitter && <TwitterCard twitter={twitter} gm={gm} height="h-6" />}
        </div>
      </div>
    </div>
  );
};

type SocialCardProps = {
  twitter?: string;
  twitch?: string;
  height: string;
  gm: boolean;
};

const TwitterCard = ({ twitter, gm, height }: SocialCardProps) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faTwitter}
        className={clsx(
          'w-auto mr-2',
          height,
          gm ? 'text-blue-800' : 'text-white'
        )}
      />
      {twitter}
    </>
  );
};

const TwitchCard = ({ twitch, gm, height }: SocialCardProps) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faTwitch}
        className={clsx(
          'w-auto mr-2 h-4',
          height,
          gm ? 'text-blue-800' : 'text-white'
        )}
      />
      {twitch}
    </>
  );
};

export const PlayerCard = (props: CardProps) => {
  return (
    <div>
      <div
        className={clsx(
          'aspect-video h-auto rounded border-2 border-gray-300 bg-cover',
          props.width === 'small' && 'w-[300px]',
          props.width !== 'small' && props.width !== 'large' ? 'w-full' : ''
        )}
      >
        <img
          src={props.image}
          alt="Placeholder image"
        />
      </div>
      <CharacterBar {...props} />
    </div>
  );
}
