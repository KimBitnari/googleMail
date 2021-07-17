import Head from 'next/head'
import Layout from '../components/mailLayout'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import InboxMails from '../components/inboxMails'

// export async function getServerSideProps(context) {
//   return {
//     props: { 
//       data: data 
//     }
//   }
// };

export default function Home({  }) {
  const [mails, setMails] = useState(useSelector((state) => state.user.inbox))

  return (
    <Layout inbox>
      <Head>
        <title>Gmail</title>
      </Head>
      <section>
        {
          mails.map((mail, index) => {
            return <InboxMails mail={mail} key={index} />
          })
        }
      </section>
    </Layout>
  )
}