import axios from 'axios';
import Image from 'next/image';

type CoinApiListAllAsstesResponse = [
  {
    asset_id: string;
    name: string;
    type_is_crypto: number;
    data_quote_start: Date;
    data_quote_end: Date;
    data_orderbook_start: Date;
    data_orderbook_end: Date;
    data_trade_start: Date;
    data_trade_end: Date;
    data_symbols_count: number;
    volume_1hrs_usd: number;
    volume_1day_usd: number;
    volume_1mth_usd: number;
    price_usd: number;
    id_icon: string;
    supply_current: number;
    supply_total: number;
    supply_max: number;
    data_start: string;
    data_end: string;
  },
];

type Crypto = {
  id: number;
  name: string;
  image: string;
};

const cryptos: Crypto[] = [
  {
    id: 1,
    name: 'Bitcoin',
    image: 'https://placehold.it/50x50/ff0011',
  },
  {
    id: 2,
    name: 'Ethereum',
    image: 'https://placehold.it/50x50/ab1234',
  },
  {
    id: 3,
    name: 'Ripple',
    image: 'https://placehold.it/50x50/ffbbcc',
  },
  {
    id: 4,
    name: 'Solana',
    image: 'https://placehold.it/50x50/ababab',
  },
];

export default async function Trade() {
  let cryptos = [];

  // Vorbereitung d Coin API
  // 17bf42f7-860f-4465-839d-e807390b31bc

  // create from existing, dort sie cmd line

  // HOW TO LOAD ASYNC DATA WITH REACT
  // put API KEY in .env file!
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5',
      {
        headers: {
          'X-CMC_PRO_API_KEY': '17bf42f7-860f-4465-839d-e807390b31bc',
        },
      },
    );

    cryptos = response.data;
    console.log(cryptos);
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <p className="text-xl ">Trade</p>
      <div className="min-w-[50%]">
        <table className="table table-auto table-lg">
          {/* head */}
          <thead>
            <tr>
              <th>icon</th>
              <th>id</th>
              <th>asset</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cryptos.map((crypto) => (
              <tr>
                <td>
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{crypto.id}</td>
                <td>{crypto.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
