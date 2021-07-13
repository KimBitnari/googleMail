import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import Link from 'next/link'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Link - Back to home</a>
        </Link>
        <br/>
        <a href="http://localhost:3000/"> a - Home</a>
      </h2>
    </Layout>
  )
}