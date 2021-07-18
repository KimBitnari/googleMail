import Head from 'next/head'
import Layout from '../components/mailLayout'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setStarred, setInbox } from '../reducers/user';
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
      const cp = [...starredMails]
      cp.push(e)
      console.log(cp)
      setStarredMails(cp)
      dispatch(setStarred(cp));
    }
    else {
      const cp = [...starredMails]
      const index = cp.findIndex(x => x.uid === e.uid)
      cp.splice(index, 1)
      setStarredMails(cp)
      dispatch(setStarred(cp));
    }
  }

  const onChangeRead = e => {
    const cp = [...mails]
    const index = cp.findIndex(x => x.uid === e.uid)
    cp.splice(index, 1, e)
    setMails(cp)
    dispatch(setInbox(cp));
  }

  return (
    <Layout inbox>
      <Head>
        <title>Gmail</title>
      </Head>
      <section>
        {
          mails.map((mail, index) => {
            return <InboxMails mail={mail} onChange={e => onChange(e)} onChangeRead={e => onChangeRead(e)} type="inbox" key={index} />
          })
        }
      </section>
    </Layout>
  )
}