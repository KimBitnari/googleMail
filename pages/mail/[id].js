import Head from 'next/head'
import Layout from '../../components/mailLayout'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
    const mThList = useSelector((state) => state.user.mailThreadLists)
    const [mail, setMail] = useState({})
    const [detailMails, setDetailMails] = useState([])

    useEffect(() => {
        const filterMail = mThList.filter(m => m.uid == id)
        setMail(filterMail[0])
        setDetailMails(filterMail[0].mails)
    }, [])

    return <Layout type={type}>
        <Head>
            <title>Gmail</title>
        </Head>
        <section>
            <div style={{ height:"48px" }}>
                <Link href={type=="inbox"? "/" : `/${type}`}>
                    <IoArrowBackSharp size="20" className="inline-block ml-3 mr-8 my-3 cursor-pointer" />
                </Link>
                <FaTrash size="20" className="inline-block cursor-pointer" />
            </div>
            <hr />
            <div className="inline-block pl-16 pt-5 pb-2 text-xl">{mail.title}</div>
                {
                    detailMails.map((m, index) => {
                        return <div key={index}><DetailMails mail={m} /><hr /></div>
                    })
                }
        </section>
    </Layout>
}