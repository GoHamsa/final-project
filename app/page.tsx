'use client';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function Home() {
  console.log('CloudName', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log('UploadPreset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" p-20 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-6xl font-bold mb-4">
            Jump start your crypto portfolio
          </h1>
          <p className="mb-4">
            cryEx is the easiest place to buy and sell cryptocurrency. Sign up
            and get started today.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/images/01.png"
            alt="profile3"
            width={600}
            height={600}
            className="max-w-md"
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <img
          src="/images/03.png"
          alt="Descriptive Alt Text"
          className="max-w-full h-auto"
        />
      </div>
      <div className="flex items-center justify-between p-20 ">
        <div className="text-left max-w-xl">
          <h2 className="text-3xl font-bold mb-4">
            Earn up to $10 worth of crypto
          </h2>
          <p>
            Discover how specific cryptocurrencies work — and get a bit of each
            crypto to try out for yourself.
          </p>
        </div>
        <div className="max-w-md">
          <img
            src="/images/02.png"
            alt="Earn Crypto"
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="text-center p-20">
        <h1 className="text-5xl">Create your cryptocurrency portfolio today</h1>
        <p>
          cryEx has a variety of features that make it the best place to start
          trading
        </p>
      </div>
      <div className="flex items-center justify-center dark:bg-white dark:text-black bg-black text-white text-center p-20">
        <div className="flex-1">
          <Image
            src="/images/04.webp"
            alt="Web3"
            width={200}
            height={200}
            className="max-w-md mx-auto"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Explore web3 profiles, and claim one for free
          </h2>
          <p>
            Create and customize your web3 profile, check out other profiles,
            and explore popular NFT collections and tokens.
          </p>
        </div>
      </div>

      <footer className="footer p-10  text-base-content">
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t  text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          <img src="/images/favicon.ico" alt="logo" width={24} height={24} />
          <p>
            cryEx Ltd. <br />
            Providing reliable tech since 2009
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </main>
  );
}
