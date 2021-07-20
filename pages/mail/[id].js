import Head from 'next/head'
import Layout from '../../components/mailLayout'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setInbox, setStarred, setSent, setTrash, setMailLists, setMailThreadLists } from '../../reducers/user';
import DetailMails from '../../components/detailMails'
import { IoArrowBackSharp, IoArrowUndoSharp, IoGameController } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';

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
    const jwtTokenUser = useSelector((state) => state.user.userProfile);
    const mThList = useSelector((state) => state.user.mailThreadLists)
    const [mail, setMail] = useState({})
    const [detailMails, setDetailMails] = useState([])
    const [inboxMails, setInboxMails] = useState(useSelector((state) => state.user.inbox))
    const [starredMails, setStarredMails] = useState(useSelector((state) => state.user.starred))
    const [sentMails, setSentMails] = useState(useSelector((state) => state.user.sent))
    const [trashMails, setTrashMails] = useState(useSelector((state) => state.user.trash))
    const [content, setContent] = useState("");
    const [participants, setParticipants] = useState([])
    const [participant, setParticipant] = useState("")
    const mailList = useSelector((state) => state.user.mailLists)
    const [boolean, setBoolean] = useState(false)

    useEffect(() => {
        const filterMail = mThList.filter(m => m.uid == id)
        setMail(filterMail[0])
        setDetailMails(filterMail[0].mails)
        setParticipants(filterMail[0].participants)
    }, [])

    useEffect(() => {
        const filterMail = mThList.filter(m => m.uid == id)
        setMail(filterMail[0])
        setDetailMails(filterMail[0].mails)
        setParticipants(filterMail[0].participants)
    }, [mThList])

    useEffect(() => {
        var text = "";
        for(var i in participants) {
            if(participants[i].email === jwtTokenUser.email) continue;
            else if(text === "") text += participants[i].email
            else text += ", " + participants[i].email
        }
        setParticipant(text)
    }, [participants])

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

    const onContentChange = (e) => {
        setContent(e.target.value)
    }

    const sendMsg = () => {
        const mailUid = uuidv4();

        let today = new Date();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        const mPayload = {
            content: content,
            date: month+"월 "+date+"일 "+hours+":"+minutes,
            recipientUids: participants,
            senderOfuid: jwtTokenUser.uid,
            uid: mailUid
        }

        const mp = [...mailList]
        mp.push(mPayload)
        dispatch(setMailLists(mp));

        const filterMail = mThList.filter(m => m.uid == id)
        const thIndex = mThList.findIndex(x => x.uid === id)
        mThList.splice(thIndex, 1)
        const thp = [...detailMails]
        thp[thp.length] = {uid: mailUid}
        const mThPayload = {
            hostOfuid: jwtTokenUser.uid,
            isDelete: filterMail[0].isDelete,
            isRead: filterMail[0].isRead,
            isStarred: filterMail[0].isStarred,
            mails: thp,
            participants: participants,
            title: filterMail[0].title,
            uid: filterMail[0].uid
        }

        const thmp = [...mThList]
        thmp.push(mThPayload)
        dispatch(setMailThreadLists(thmp));

        setContent("")
        setBoolean(false)
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
            <div className="w-24 inline-block ml-16 mt-5 border border-gray-300 rounded px-4 py-1.5 cursor-pointer hover:bg-gray-100"
                onClick={() => setBoolean(!boolean)}>
                <IoArrowUndoSharp size="20" className="float-left text-gray-500" />
                <span className="float-left ml-2 text-gray-500 text-sm">답장</span>
            </div>
            <div className={boolean? "mb-8" : "hidden"}>
                <div className="inline-block px-4">
                    {
                        detailMails.length%2==0? 
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-400">
                            <IoMdPerson />
                        </div>
                        :
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-blue-400">
                            <IoMdPerson />
                        </div>
                    }
                </div>
                <div className="inline-block border border-gray-300 rounded shadow-md h-44 w-3/5 p-4">
                    <div className="text-sm text-gray-500">{ participant }</div>
                    <div>
                        <textarea className="w-full text-xs py-3 outline-none resize-none h-24"
                            value={content} onChange={e => onContentChange(e)}></textarea>
                    </div>
                    <div className="bg-blue-500 rounded" style={{ width: "72px", height: "36px" }}>
                        <button className="mx-4 text-xs text-white" onClick={() => sendMsg()}>보내기</button>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}