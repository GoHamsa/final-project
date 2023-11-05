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
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=3',
      {
        headers: {
          'X-CMC_PRO_API_KEY': '17bf42f7-860f-4465-839d-e807390b31bc',
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

  // Vorbereitung d Coin API
  // 17bf42f7-860f-4465-839d-e807390b31bc

  // create from existing, dort sie cmd line

  // HOW TO LOAD ASYNC DATA WITH REACT
  // put API KEY in .env file!

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
