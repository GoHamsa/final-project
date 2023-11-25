'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import getCryptoImage from '../../util/getCryptoImage';
import { CoinMarketCapCrypto } from './page';

type CryptoListProps = { cryptos: CoinMarketCapCrypto[] };

export default function CryptoList({ cryptos }: CryptoListProps) {
  const initialCart: Record<number, number> = {};
  cryptos.forEach((coin: CoinMarketCapCrypto) => {
    initialCart[coin.id] = 0;
  });
  const [cart, setCart] = useState<Record<number, number>>(initialCart);
  function decreaseQuantityById(id: number) {
    setCart({
      ...cart,
      [id]: cart[id]! - 1,
    });
  }
  function increaseQuantityById(id: number) {
    setCart({
      ...cart,
      [id]: cart[id]! + 1,
    });
  }

  function getCoinById(id: number): CoinMarketCapCrypto | undefined {
    return cryptos.find((crypto) => crypto.id == id);
  }

  return (
    <>
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
                  href={`/trade/${crypto.name}`}
                >
                  {crypto.name}
                </Link>
              </td>
              <td>{crypto.quote.USD.price.toFixed(2)}</td>
              {/* <td>
                <button onClick={() => decreaseQuantityById(crypto.id)}>
                  -
                </button>
                {cart[crypto.id]}
                <button onClick={() => increaseQuantityById(crypto.id)}>
                  +
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {Object.entries(cart)
          .filter(([id, value]) => value !== 0)
          .map(([id, value]) => {
            const coin = getCoinById(parseInt(id)) as CoinMarketCapCrypto;
            return (
              <li key={id}>
                {coin.name} | {coin.quote.USD.price.toFixed(5)} * {value} ={' '}
                {(coin.quote.USD.price * value).toFixed(5)}
              </li>
            );
          })}
      </ul>
    </>
  );
}
