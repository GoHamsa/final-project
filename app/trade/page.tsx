import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import getCryptoImage from '../../util/getCryptoImage';
import CryptoList from './CryptoList';

export type CoinMarketCapCrypto = {
  id: number;
  name: string;
  image: string;
  quote: { USD: { price: number } };
};

async function getCryptos(): Promise<CoinMarketCapCrypto[]> {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5',
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
        <CryptoList cryptos={cryptos}></CryptoList>
      </div>
    </div>
  );
}
