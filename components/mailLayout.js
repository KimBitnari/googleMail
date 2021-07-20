import Head from 'next/head'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import { IoMenu, IoSettingsOutline, IoFileTraySharp, IoStarSharp } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";
import { IoMdOptions, IoMdHelpCircleOutline, IoIosKeypad, IoMdSend } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile, setMailLists, setSent, setMailThreadLists } from '../reducers/user';
import users from '../user.json';
import { v4 as uuidv4 } from 'uuid';

export default function Layout({ children, inbox, starred, sent, trash, type }) {
    const dispatch = useDispatch();
    const jwtTokenUser = useSelector((state) => state.user.userProfile);
    const [isMailActive, setMailActive] = useState(false);
    const [isProfileActive, setProfileActive] = useState(false);
    const [otherUsers, setOtherUsers] = useState([]);
    const [mails, setMails] = useState([])
    const sentMailList = useSelector((state) => state.user.sent)
    const mailList = useSelector((state) => state.user.mailLists)
    const mThList = useSelector((state) => state.user.mailThreadLists)
    const [recipient, setRecipient] = useState("");
    const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

    const onRecipientChange = (e) => {
        setRecipient(e.target.value)
      }

    const onTitleChange = (e) => {
        setTitle(e.target.value)
      }

    const onContentChange = (e) => {
        setContent(e.target.value)
      }

    useEffect(() => {
        const firstOtherUsers = []
        for(var i in users.users) {
            if(jwtTokenUser.uid == users.users[i].uid) continue;
            else {
                firstOtherUsers.push(users.users[i])
            }
        }
        setOtherUsers(firstOtherUsers);

        setMails(sentMailList)
        // for(var i in sentMailList) {
        //     for(var j in sentMailList[i].mails) {
        //         const selectMail = mailList.filter(list => list.uid == sentMailList[i].mails[j].uid);
        //         if(selectMail[0].senderOfuid == jwtTokenUser.uid) {
        //             const cp = [...mails]
        //             cp.push(sentMailList[i])
        //             setMails(cp)
        //             break;
        //         }
        //     }
        // }
    },[]);

    const onChangeUser = (id) => {
        const payload = users.users.filter(user => user.uid == id);
        dispatch(setUserProfile(payload[0]));

        const changeOtherUsers = []
        for(var i in users.users) {
            if(payload[0].uid == users.users[i].uid) continue;
            else {
                changeOtherUsers.push(users.users[i])
            }
        }
        setOtherUsers(changeOtherUsers);
    }

    const sendMsg = () => {
        const mailUid = uuidv4();
        const mailThUid = uuidv4();
        const otherMailThUid = uuidv4();

        let today = new Date();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        const finishReci = otherUsers.filter(u => u.email == recipient)

        const mPayload = {
            content: content,
            date: month+"월 "+date+"일 "+hours+":"+minutes,
            recipientUids: [
                {
                    uid: finishReci[0].uid,
                }
            ],
            senderOfuid: jwtTokenUser.uid,
            uid: mailUid
        }
        const mThPayload = {
            hostOfuid: jwtTokenUser.uid,
            isDelete: false,
            isRead: true,
            isStarred: false,
            mails: [
                {
                    uid: mailUid,
                }
            ],
            participants: [
                {
                    uid: jwtTokenUser.uid,
                },
                {
                    uid: finishReci[0].uid,
                }
            ],
            title: title,
            uid: mailThUid
        }
        const otherThPayload = {
            hostOfuid: finishReci[0].uid,
            isDelete: false,
            isRead: false,
            isStarred: false,
            mails: [
                {
                    uid: mailUid,
                }
            ],
            participants: [
                {
                    uid: jwtTokenUser.uid,
                },
                {
                    uid: finishReci[0].uid,
                }
            ],
            title: title,
            uid: otherMailThUid
        }
        
        const mp = [...mailList]
        mp.push(mPayload)
        dispatch(setMailLists(mp));

        const smp = [...mails]
        smp.push(mThPayload)
        dispatch(setSent(smp));

        const thmp = [...mThList]
        thmp.push(mThPayload)
        thmp.push(otherThPayload)
        dispatch(setMailThreadLists(thmp));

        setMailActive(!isMailActive)
    }
    
    return (
        <div>
            <Head>
                <title>Gmail</title>
            </Head>
            <header>
                <div className="p-2 flex">
                    <div className="pr-8 h-11 flex min-w-max" style={{ width:"238px" }}>
                        <div className="p-3 mx-1 inline-block align-middle cursor-pointer"><IoMenu size="24"/></div>
                        <div className="relative top-1 float-left">
                            <Link href="/">
                                <a className="inline-block align-middle">
                                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
                                    style={{ width:"100px" }} />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex h-11 min-w-max flex-auto px-2">
                        <div className="h-8 px-2.5 w-full">
                            <div className="bg-gray-100 relative rounded h-11" style={{ maxWidth:"720px" }}>
                                <div className="p-2 m-1 inline-block float-left cursor-pointer"><HiSearch size="24" /></div>
                                <div className="block relative float-left top-2.5"><input placeholder="메일 검색" className="bg-transparent text-sm" /></div>
                                <div className="p-2 m-1 right-0 cursor-pointer absolute"><IoMdOptions size="24" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-max h-11">
                        <div className="p-2 m-1 inline-block cursor-pointer"><IoMdHelpCircleOutline size="24" /></div>
                        <div className="p-2 m-1 inline-block cursor-pointer"><IoSettingsOutline size="24" /></div>
                    </div>
                    <div className="min-w-max h-11">
                        <div className="p-2 m-1 inline-block cursor-pointer"><IoIosKeypad size="24" /></div>
                        <div className="pt-1 px-2 mx-1 inline-block float-right cursor-pointer"  onClick={() => { setProfileActive(!isProfileActive); }}>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-700 text-white text-sm">{jwtTokenUser.firstOfName}</div>
                        </div>
                    </div>
                </div>
            </header>
            <hr />
            <main>
                <div className="h-screen float-left min-w-max" style={{ width: "256px" }}>
                    <div className="flex shadow-md rounded-full h-12 py-2 px-3 w-28 cursor-pointer ml-3 my-4" onClick={() => { setMailActive(!isMailActive); }}>
                        <img className="absolute" src="https://www.gstatic.com/images/icons/material/colored_icons/2x/create_32dp.png" width="34" />
                        <p className="my-2 ml-10 text-xs">편지쓰기</p>
                    </div>
                    <div>
                        {inbox || type=="inbox" ? (<div className="bg-gray-200 rounded-r-full mr-4 cursor-pointer">
                                <Link href="/">
                                    <div className="ml-6 h-8 pt-2">
                                        <IoFileTraySharp className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs font-bold">받은편지함</p>
                                    </div>
                                </Link>
                            </div>) : (<div className="mr-4 cursor-pointer hover:bg-gray-100">
                                <Link href="/">
                                    <div className="ml-6 h-8 pt-2">
                                        <IoFileTraySharp className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs">받은편지함</p>
                                    </div>
                                </Link>
                            </div>)
                        }
                        {starred || type=="starred" ? (<div className="bg-gray-200 rounded-r-full mr-4 cursor-pointer">
                                <Link href="/starred">
                                    <div className="ml-6 h-8 pt-2">
                                        <IoStarSharp className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs font-bold">별표편지함</p>
                                    </div>
                                </Link>
                            </div>) : (<div className="mr-4 cursor-pointer hover:bg-gray-100">
                                <Link href="/starred">
                                    <div className="ml-6 h-8 pt-2">
                                        <IoStarSharp className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs">별표편지함</p>
                                    </div>
                                </Link>
                            </div>)
                        }
                        {sent || type=="sent" ? (<div className="bg-gray-200 rounded-r-full mr-4 cursor-pointer">
                                <Link href="/sent">
                                    <div className="ml-6 h-8 pt-2">
                                        <IoMdSend className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs font-bold">보낸편지함</p>
                                    </div>
                                </Link>
                            </div>) : (<div className="mr-4 cursor-pointer hover:bg-gray-100">
                                <Link href="/sent">
                                    <div className="ml-6 h-8 pt-2">
                                        <IoMdSend className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs">보낸편지함</p>
                                    </div>
                                </Link>
                            </div>)
                        }
                        {trash || type=="trash" ? (<div className="bg-gray-200 rounded-r-full mr-4 cursor-pointer">
                                <Link href="/trash">
                                    <div className="ml-6 h-8 pt-2">
                                        <FaTrash className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs font-bold">휴지통</p>
                                    </div>
                                </Link>
                            </div>) : (<div className="mr-4 cursor-pointer hover:bg-gray-100">
                                <Link href="/trash">
                                    <div className="ml-6 h-8 pt-2">
                                        <FaTrash className="absolute text-gray-500" size="20" />
                                        <p className="ml-10 text-gray-500 text-xs">휴지통</p>
                                    </div>
                                </Link>
                            </div>)
                        }
                    </div>
                    <hr className="mt-3" />
                </div>
                <div className="h-full min-w-max" style={{ minWidth: "688px" }}>{children}</div>
                <div className={isMailActive? "absolute bottom-0 right-0 shadow-lg block z-20" : "hidden" } style={{ width: "450px", height: "430px" }}>
                    <div className="bg-gray-700 text-sm pl-4 py-2 text-white rounded-t-xl">
                        <p className="inline-block">새 메일</p>
                        <p className="float-right mr-4 cursor-pointer w-6 h-6 text-center hover:bg-gray-500" onClick={() => { setMailActive(false); }}>x</p>
                    </div>
                    <div className="px-4">
                        <div>
                            <p className="inline-block text-xs py-2 text-gray-400">받는 사람</p>
                            <input type="text" className="text-xs py-2 ml-2 outline-none" style={{ width: "354px" }}
                                value={recipient} onChange={e => onRecipientChange(e)} />
                            <hr />
                        </div>
                        <div>
                            <input type="text" placeholder="제목" className="text-xs py-2 outline-none w-full" 
                                value={title} onChange={e => onTitleChange(e)} />
                            <hr />
                        </div>
                        <div>
                            <textarea className="w-full text-xs py-3 outline-none resize-none" style={{ height: "266px" }}
                                value={content} onChange={e => onContentChange(e)}></textarea>
                        </div>
                        <div>
                            <div className="bg-blue-500 rounded" style={{ width: "72px", height: "36px" }}>
                                <button className="mx-4 text-xs text-white" onClick={() => sendMsg()}>보내기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={isProfileActive? "absolute top-14 right-0 shadow-lg block z-10" : "hidden" } style={{ width: "338px", height: "340px" }}>
                    <div className="mx-8 my-5 z-20" style={{ width: "272px", height: "160px" }}>
                        <div>
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-purple-700 text-white text-3xl ml-20 mb-3">{jwtTokenUser.firstOfName}</div>
                        </div>
                        <div>
                            <div className="text-center">{jwtTokenUser.name}</div>
                            <div className="text-center text-sm text-gray-500">{jwtTokenUser.email}</div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        {
                        otherUsers.map((otherUser, index) => {
                            // onClick={() => { onChangeUser(otherUser.uid); }}
                            return (
                                <div key={index} className="px-8 py-3 cursor-pointer z-20">
                                    <div className="inline-block mr-3 align-middle">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-700 text-white text-sm">{otherUser.firstOfName}</div>
                                    </div>
                                    <div className="inline-block align-middle">
                                        <div className="text-sm">{otherUser.name}</div>
                                        <div className="text-xs text-gray-500">{otherUser.email}</div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}