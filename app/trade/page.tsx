import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import getCryptoImage from '../../util/getCryptoImage';

type CoinMarketCapCrypto = {
  id: number;
  name: string;
  image: string;
  quote: { USD: { price: number } };
};

async function getCryptos(): Promise<CoinMarketCapCrypto[]> {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=19',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_API_KEY,
        },
      },
    );

    return response.data.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Trade() {
  const cryptos = await getCryptos();
  console.log(cryptos);

  return (
    <div>
      <p className="text-xl ">Trade</p>
      <div className="min-w-[50%]">
        <table className="table table-auto table-lg">
          {/* head */}
          <thead>
            <tr>
              <th>icon</th>
              <th>asset</th>
              <th>price in USD</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto) => (
              <tr key={crypto.id}>
                <td>
                  <Image
                    src={getCryptoImage(crypto.id, '64x64')}
                    alt={crypto.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>
                  <Link
                    className="link link-hover"
                    href={`/trade/${crypto.id}`}
                  >
                    {crypto.name}
                  </Link>
                </td>
                <td>{crypto.quote.USD.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
