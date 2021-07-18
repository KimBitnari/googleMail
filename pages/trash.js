import Head from 'next/head'
import Layout from '../components/mailLayout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setStarred } from '../reducers/user';
import InboxMails from '../components/inboxMails'

// export async function getServerSideProps(context) {
// };

export default function Trash({  }) {
    const dispatch = useDispatch();
    const [mails, setMails] = useState(useSelector((state) => state.user.trash))
    const [starredMails, setStarredMails] = useState(useSelector((state) => state.user.starred))

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

    return (
        <Layout trash>
            <Head>
                <title>Gmail</title>
            </Head>
            <section>
                {
                    mails.map((mail, index) => {
                        return <InboxMails mail={mail} onChange={e => onChange(e)} type="trash" key={index} />
                    })
                }
            </section>
        </Layout>
    )
}