import Head from 'next/head'
import Layout from '../components/mailLayout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { setUserProfile } from '../reducers/user';
import InboxMails from '../components/inboxMails'

// export async function getServerSideProps(context) {
// };

export default function Starred({  }) {
    const mails = useSelector(state => (state.user.starred), shallowEqual)
    //const [mails, setMails] = useState(useSelector((state) => state.user.starred))

    // useEffect(() => {
    //     setMails(mails)
    // }, [mails])
    
    return (
        <Layout starred>
            <Head>
                <title>Gmail</title>
            </Head>
            <section>
                {
                    mails.map((mail, index) => {
                        return <InboxMails mail={mail} type="starred" key={index} />
                    })
                }
            </section>
        </Layout>
    )
}