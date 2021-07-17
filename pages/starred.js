import Head from 'next/head'
import Layout from '../components/mailLayout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile } from '../reducers/user';
import InboxMails from '../components/inboxMails'

// export async function getServerSideProps(context) {
// };

export default function Starred({  }) {
    const [mails, setMails] = useState(useSelector((state) => state.user.starred))
    
    return (
        <Layout starred>
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