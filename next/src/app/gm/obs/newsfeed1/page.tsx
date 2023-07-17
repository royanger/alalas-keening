import React from 'react';
import { Feed1, Feed2, Feed3 } from '@/components/news-headline';
import { getNews } from '@/lib/getNews'

export default async function Newsfeed1() {

  const news = await getNews()

  return (
    <div className="flex h-full items-center justify-center">
      <div className="grid grid-cols-3 gap-24 px-24">
        <Display image={news.data[0].attributes.reporter.data.attributes.image.data.attributes.url}>
          <Feed1
            colour={news.data[0].attributes.accentColour}
            feed={news.data[0].attributes.reporter.data.attributes.feed}
            reporter={news.data[0].attributes.reporter.data.attributes.name}
            byline={news.data[0].attributes.byline}
          />
        </Display>
        <Display image={news.data[1].attributes.reporter.data.attributes.image.data.attributes.url}>
          <Feed2
            colour={news.data[1].attributes.accentColour}
            feed={news.data[1].attributes.reporter.data.attributes.feed}
            reporter={news.data[1].attributes.reporter.data.attributes.name}
            byline={news.data[1].attributes.byline}
          />
        </Display>
        <Display image={news.data[2].attributes.reporter.data.attributes.image.data.attributes.url}>
          <Feed3
            colour={news.data[2].attributes.accentColour}
            feed={news.data[2].attributes.reporter.data.attributes.feed}
            reporter={news.data[2].attributes.reporter.data.attributes.name}
            byline={news.data[2].attributes.byline}
          />
        </Display>
      </div>
      {/* <div><pre>{JSON.stringify(news, null, 2)}</pre></div> */}
    </div>
  );
};

type DisplayProps = {
  image: string;
  children: React.ReactNode;
};

const Display = ({ image, children }: DisplayProps) => {
  return (
    <>
      <div className="flex flex-col rounded-xl border-8 border-gray-300">
        <img src={image} className="" />
        {children}
      </div>
    </>
  );
}
