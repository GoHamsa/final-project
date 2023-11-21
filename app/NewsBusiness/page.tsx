import axios from 'axios';
import Link from 'next/link';

type NewsDataNews = {
  article_id: string;
  link: string;
  title: string;
  description: string;
  image_url: string;
  pubDate: string;
  category: string;
};
// i wanted to show crypto-news, but API for crypto-news costed 600 $ per month
async function getNews(): Promise<NewsDataNews[]> {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?language=en&category=business&image=1&apikey=${process.env.NEWS_DATA_API_KEY}`,
    );

    return response.data.results;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function News() {
  const newsList = await getNews();
  console.log(newsList);
  return (
    <div>
      <div className="flex flex-wrap">
        {newsList.map((news) => (
          <div
            key={news.article_id}
            className="card w-96 bg-base-100 shadow-xl m-4"
          >
            <figure>
              <img
                className="w-full aspect-auto"
                src={news.image_url}
                alt={news.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{news.title}</h2>
              <div className="card-actions justify-end">
                <Link
                  className="btn"
                  href={{ pathname: news.link }}
                  target="_blank"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
