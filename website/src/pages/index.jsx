import Head from 'next/head'
import {Header} from '@/components/Header'
import {Hero} from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Head>
        <title>Anchorscad</title>
        <meta
          name="description"
          content="By leveraging insights from our network of industry insiders, you’ll know exactly when to buy to maximize profit, and exactly when to sell to avoid painful losses."
        />
      </Head>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  )
}
