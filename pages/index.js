import Head from 'next/head'
import Layout from '../components/mailLayout'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setStarred } from '../reducers/user';
import InboxMails from '../components/inboxMails'

// export async function getServerSideProps(context) {
//   return {
//     props: { 
//       data: data 
//     }
//   }
// };

export default function Home({  }) {
  const dispatch = useDispatch();
  // const { basicMail, userCng } = useSelector(state => ({
  //   basicMail: state.user.inbox,
  //   userCng: state.user.userProfile
  // }));
  const [mails, setMails] = useState(useSelector((state) => state.user.inbox))
  const [starredMails, setStarredMails] = useState(useSelector((state) => state.user.starred))

  useEffect(() => {
    console.log(mails)
  }, [mails])

  const onChange = e => {
    //console.log(e)
    if(e.isStarred) {

    }
    else {
      const cp = [...starredMails]
      const index = cp.findIndex(x => x.uid === e.uid)
      cp.splice(index, 1)
      setStarredMails(cp)
      console.log(cp)
      dispatch(setStarred(starredMails));
    }
  }

  return (
    <Layout inbox>
      <Head>
        <title>Gmail</title>
      </Head>
      <section>
        {
          mails.map((mail, index) => {
            return <InboxMails mail={mail} onChange={e => onChange(e)} type="inbox" key={index} />
          })
        }
      </section>
    </Layout>
  )
}