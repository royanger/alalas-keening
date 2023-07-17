import clsx from 'clsx';

export const FeedColours = {
  blue: { border: 'border-blue-700', bg: 'bg-blue-700' },
  gray: { border: 'border-gray-700', bg: 'bg-gray-700' },
  red: { border: 'border-rose-800', bg: 'bg-red-800' },
  green: { border: 'border-green-700', bg: 'bg-green-700' },
  indigo: { border: 'border-indigo-700', bg: 'bg-indigo-700' },
  orange: { border: 'border-orange-700', bg: 'bg-orange-700' },
};

export type FeedProps = {
  colour: keyof typeof FeedColours;
  feed: string;
  reporter: string;
  byline: string;
};

export const Feed1 = ({ colour, feed, reporter, byline }: FeedProps) => {
  return (
    <div className="flex h-32 flex-col bg-white">
      <div className={clsx('flex flex-row items-center', FeedColours[colour].bg)}>
        <div className="grow px-4 py-1 text-2xl text-white">{reporter}</div>
        <div className="px-4 py-1 text-xl text-white">{feed}</div>
      </div>
      <Ticker byline={byline} />
    </div>
  );
};

export const Feed2 = ({ colour, feed, reporter, byline }: FeedProps) => {
  return (
    <div className="flex h-32 flex-col bg-white">
      <div className={clsx('px-4 py-1 text-2xl text-white', FeedColours[colour].bg)}>
        {reporter}
      </div>
      <Ticker byline={byline} textSize="text-2xl" />
      <div
        className={clsx(
          'flex justify-end px-4 py-1 text-white',
          FeedColours[colour].bg
        )}
      >
        {feed}
      </div>
    </div>
  );
};

export const Feed3 = ({ colour, feed, reporter, byline }: FeedProps) => {
  return (
    <div
      className={clsx('flex h-32 flex-col border-t-8 bg-white', FeedColours[colour].border)}
    >
      <Ticker byline={byline} />
      <div className={clsx('flex flex-row px-4 py-1 text-white', FeedColours[colour].bg)}>
        <div className="mr-2 text-2xl">{feed}:</div>
        <div className="text-2xl">{reporter}</div>
      </div>
    </div>
  );
};

export type TickerProps = {
  byline: string;
  textSize?: string;
};

export const Ticker = ({ byline, textSize = 'text-3xl' }: TickerProps) => {
  return (
    <div className="relative flex grow items-center justify-center overflow-hidden">
      <ul className="news-ticker-h z-50 m-0 flex p-0 pl-[200%] text-gray-800">
        <li
          className={clsx(
            'flex w-full items-center whitespace-nowrap pl-[20px]',
            textSize
          )}
        >
          {byline}
        </li>
      </ul>
    </div>
  );
}
