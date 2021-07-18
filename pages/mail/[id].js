import Head from 'next/head'
import Layout from '../../components/mailLayout'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setInbox, setStarred, setSent, setTrash } from '../../reducers/user';
import DetailMails from '../../components/detailMails'
import { IoArrowBackSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export async function getServerSideProps(context) {
    const { id } = context.query;
    const { type } = context.query;

    return { 
        props: { 
            id: id,
            type: type
        } 
    };
}

export default function Post({ id, type }) {
    const dispatch = useDispatch();
    const mThList = useSelector((state) => state.user.mailThreadLists)
    const [mail, setMail] = useState({})
    const [detailMails, setDetailMails] = useState([])
    const [inboxMails, setInboxMails] = useState(useSelector((state) => state.user.inbox))
    const [starredMails, setStarredMails] = useState(useSelector((state) => state.user.starred))
    const [sentMails, setSentMails] = useState(useSelector((state) => state.user.sent))
    const [trashMails, setTrashMails] = useState(useSelector((state) => state.user.trash))

    useEffect(() => {
        const filterMail = mThList.filter(m => m.uid == id)
        console.log(filterMail)
        setMail(filterMail[0])
        setDetailMails(filterMail[0].mails)
    }, [])

    const onChangeDelete = (id) => {
        const inboxD = [...inboxMails]
        const starredD = [...starredMails]
        const sentD = [...sentMails]
        const trashD = [...trashMails]

        const inIndex = inboxD.findIndex(x => x.uid === id)
        if(inIndex != -1) {
            inboxD.splice(inIndex, 1)
            setInboxMails(inboxD)
            dispatch(setInbox(inboxD));
        }

        const stIndex = starredD.findIndex(x => x.uid === id)
        if(stIndex != -1) {
            starredD.splice(stIndex, 1)
            setStarredMails(starredD)
            dispatch(setStarred(starredD));
        }
        
        const sIndex = sentD.findIndex(x => x.uid === id)
        if(sIndex != -1) {
            sentD.splice(sIndex, 1)
            setSentMails(sentD)
            dispatch(setSent(sentD));
        }
        
        const trIndex = mThList.findIndex(x => x.uid === id)
        trashD.push(mThList[trIndex])
        setTrashMails(trashD)
        dispatch(setTrash(trashD))

        alert("삭제되었습니다.")
    }

    return <Layout type={type}>
        <Head>
            <title>Gmail</title>
        </Head>
        <section>
            <div style={{ height:"48px" }}>
                <Link href={type=="inbox"? "/" : `/${type}`}>
                    <IoArrowBackSharp size="20" className="inline-block ml-3 mr-8 my-3 cursor-pointer" />
                </Link>
                <FaTrash size="20" className="inline-block cursor-pointer" onClick={() => onChangeDelete(id)} />
            </div>
            <hr />
            <div className="inline-block pl-16 pt-5 pb-2 text-xl">{mail.title}</div>
                {
                    detailMails.map((m, index) => {
                        return <div key={index}><DetailMails mail={m} index={index} /><hr /></div>
                    })
                }
        </section>
    </Layout>
}