import React from 'react';
import { Feed1 } from '@/components/news-headline';
import { getNews } from '@/lib/getNews'
import clsx from 'clsx';

export default async function Newsfeed1() {

  const news = await getNews()

  return (
    <div className="flex h-full items-center justify-center">
      <div className="grid grid-cols-3 gap-24 px-24">
        <Display
          reporterImage={news.data[0].attributes.reporter.data.attributes.image.data.attributes.url}
          inlayPosition={news.data[0].attributes.inlayPosition}
          newsImage={news.data[0].attributes.image.data.attributes.url}
        >
          <Feed1
            colour={news.data[0].attributes.accentColour}
            feed={news.data[0].attributes.reporter.data.attributes.feed}
            reporter={news.data[0].attributes.reporter.data.attributes.name}
            byline={news.data[0].attributes.byline}
          />
        </Display>
        <Display
          reporterImage={news.data[1].attributes.reporter.data.attributes.image.data.attributes.url}
          inlayPosition={news.data[1].attributes.inlayPosition}
          newsImage={news.data[1].attributes.image.data.attributes.url}
        >
          <Feed1
            colour={news.data[1].attributes.accentColour}
            feed={news.data[1].attributes.reporter.data.attributes.feed}
            reporter={news.data[1].attributes.reporter.data.attributes.name}
            byline={news.data[1].attributes.byline}
          />
        </Display>
        <Display
          reporterImage={news.data[2].attributes.reporter.data.attributes.image.data.attributes.url}
          inlayPosition={news.data[2].attributes.inlayPosition}
          newsImage={news.data[2].attributes.image.data.attributes.url}
        >
          <Feed1
            colour={news.data[2].attributes.accentColour}
            feed={news.data[2].attributes.reporter.data.attributes.feed}
            reporter={news.data[2].attributes.reporter.data.attributes.name}
            byline={news.data[2].attributes.byline}
          />
        </Display>

      </div>
    </div>
  );
};

const InlayPositionOptions = {
  "top-right": "top-0 right-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "top-left": "top-0 left-0"
}

type DisplayProps = {
  newsImage: string;
  reporterImage: string;
  inlayPosition: keyof typeof InlayPositionOptions
  children: React.ReactNode;
};

const Display = ({
  inlayPosition,
  reporterImage,
  newsImage,
  children,
}: DisplayProps) => {
  return (
    <>
      <div className="relative flex flex-col rounded-xl border-8 border-gray-300 h-[640px]">
        <div
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${newsImage})` }}
        >
          <InlayImage image={reporterImage} inlayPosition={inlayPosition} />
        </div>
        {children}
      </div>
    </>
  );
};

type InlayProps = {
  image: string;
  inlayPosition: keyof typeof InlayPositionOptions
};

const InlayImage = ({ image, inlayPosition }: InlayProps) => {
  return (
    <div className={clsx('absolute', InlayPositionOptions[inlayPosition])}>
      <img src={image} className="h-36 w-auto" />
    </div>
  );
};

