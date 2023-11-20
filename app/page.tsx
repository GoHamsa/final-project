'use client';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function Home() {
  console.log('CloudName', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log('UploadPreset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1>Homepage test</h1>

      <CldUploadWidget uploadPreset={process.env.NEXT_CLOUDINARY_UPLOAD_PRESET}>
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>
      <p>
        ##### ######## ######## ####### ############# ################
        ############### ############### ############## ##############
        ############## ############## ############## ###################
        ######## ######## ####### ############# ################ ###############
        ############### ############## ############## ##############
        ############## ############## ################### ######## ########
        ####### ############# ################ ############### ###############
        ############## ############## ############## ##############
        ############## ################### ######## ######## #######
        ############# ################ ############### ###############
        ############## ############## ############## ##############
        ############## ##############
      </p>

      <CldImage
        width="600"
        height="600"
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1700414983/cld-sample-4.jpg`}
        alt="Description of my image"
      />

      <Image
        src="/images/download.jpeg"
        alt="profile3"
        width={200}
        height={200}
      />
    </main>
  );
}
