import Image from 'next/image';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1>Homepage test</h1>
      <br />
      <br />
      <br />
      <br />
      <button className="btn btn-primary">Button</button>
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
      <Image
        src="/images/profile.png"
        alt="profile1"
        width={200}
        height={200}
      />
      <Image
        src="/images/profile.jpg"
        alt="profile2"
        width={200}
        height={200}
      />
      <Image
        src="/images/profile.jpg"
        alt="profile3"
        width={200}
        height={200}
      />
      <Image
        src="/images/profile.png"
        alt="profile3"
        width={200}
        height={200}
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
