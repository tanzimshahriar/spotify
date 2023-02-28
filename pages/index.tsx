import { getSession, GetSessionParams, useSession } from 'next-auth/react';
import Head from 'next/head'
import Center from '../components/Center'
import Player from '../components/Player';
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className='flex bg-black'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>
    
    </div>
  )
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}
