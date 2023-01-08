import Head from 'next/head'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import api from '@/s3-api'
import path from 'path'

export async function getStaticPaths() {
  const keys = await api.fetch()
  await api.cache.set(keys)
  return {
    paths: keys.map((key) => {
      return { params: { model: path.dirname(key).split('/') } }
    }),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const modelPath = context.params.model.join('/')
  const S3_URL = 'https://anchorscad.s3-ap-southeast-2.amazonaws.com/'
  const basePath =
    process.env.NODE_ENV === 'development'
      ? path.join('/models/', modelPath)
      : S3_URL + modelPath
  const model = await api.cache.get(modelPath)
  const imageFiles = model.files.map((file) => basePath + '/' + file)
  return {
    props: {
      imageFiles,
    },
  }
}

export default function Home({ imageFiles }) {
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
        <Hero imageFiles={imageFiles} />
      </main>
    </>
  )
}
