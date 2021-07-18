import Head from 'next/head'
import Layout from '../components/mailLayout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setStarred, setSent } from '../reducers/user';
import SentMails from '../components/sentMails'

// export async function getServerSideProps(context) {
// };

export default function Sent({  }) {
    const dispatch = useDispatch();
    const [mails, setMails] = useState(useSelector((state) => state.user.sent))
    // const sentMailList = useSelector((state) => state.user.sent)
    // const mailList = useSelector((state) => state.user.mailLists)
    // const jwtTokenUser = useSelector((state) => state.user.userProfile);
    const [starredMails, setStarredMails] = useState(useSelector((state) => state.user.starred))

    // useEffect(() => {
    //     var cnt = 0
    //     for(var i in sentMailList) {
    //         for(var j in sentMailList[i].mails) {
    //             const selectMail = mailList.filter(list => list.uid == sentMailList[i].mails[j].uid);
    //             if(selectMail[0].senderOfuid == jwtTokenUser.uid) {
    //                 // const cp = [...mails]
    //                 // cp.push(sentMailList[i])
    //                 // setMails(cp)
    //                 // break;
    //                 cnt = 1
    //                 break;
    //             }
    //         }
    //         if(cnt == 0) {
    //             const cp = [...mails]
    //             const index = cp.findIndex(x => x.uid === sentMailList[i].uid)
    //             cp.splice(index, 1)
    //             setMails(cp)
    //         }
    //         cnt = 0;
    //     }
    // },[]);

    const onChange = e => {
        //console.log(e)
        if(e.isStarred) {
          const cp = [...starredMails]
          cp.push(e)
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
        dispatch(setSent(cp));
    }

    return (
        <Layout sent>
            <Head>
                <title>Gmail</title>
            </Head>
            <section>
                {
                    mails.map((mail, index) => {
                        return <SentMails mail={mail} onChange={e => onChange(e)} onChangeRead={e => onChangeRead(e)} type="sent" key={index} />
                    })
                }
            </section>
        </Layout>
    )
}