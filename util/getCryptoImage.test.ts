import getCryptoImage from './getCryptoImage';

describe('getCryptoImage', () => {
  it('should generate correct image URL', () => {
    const expectedUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/123.png`;

    expect(getCryptoImage(123, '64x64')).toBe(expectedUrl);
  });
});
