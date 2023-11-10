import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <h1>Homepage</h1>
      <br />
      <br />
      <br />
      <br />
      <button className="btn btn-primary">Button</button>
    </>
  );
}
