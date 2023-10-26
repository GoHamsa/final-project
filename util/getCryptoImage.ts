export default function getCryptoImage(
  id: number,
  size: '32x32' | '64x64' | '128x128',
): string {
  return `https://s2.coinmarketcap.com/static/img/coins/${size}/${id}.png`;
}
