import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'
import { IoStarOutline, IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

export default function InboxMails (props) {
    const [mailUser, setMailUser] = useState([])
    const mailList = useSelector((state) => state.user.mailLists)
    const userList = useSelector((state) => state.user.userLists)
    const jwtTokenUser = useSelector((state) => state.user.userProfile);
    const [isStarred, setIsStarred] = useState(props.mail.isStarred)
    const [isRead, setIsRead] = useState(props.mail.isRead)
    const [isDelete, setIsDelete] = useState(props.mail.isDelete)
    const [date, setDate] = useState("")

    useEffect(() => {
        for(var i in props.mail.mails) {
            const selectMail = mailList.filter(list => list.uid == props.mail.mails[i].uid);
            const selectUser = userList.filter(list => list.uid == selectMail[0].senderOfuid)

            if(selectUser[0].uid === jwtTokenUser.uid) continue;
            // {
            //     const cp = [...mailUser]
            //     cp.push("나")
            //     setMailUser(cp)
            // }
            else {
                const cp = [...mailUser]
                if(cp.includes(selectUser[0].name)) continue;
                else {
                    cp.push(selectUser[0].name)
                    setMailUser(cp)
                }
            }

            if(i == props.mail.mails.length-1) setDate(selectMail[0].date)
        }
    },[]);

    const onChangeStar = () => {
        props.mail.isStarred = !isStarred
        setIsStarred(!isStarred)
        props.onChange(props.mail)
    }

    const onChangeRead = () => {
        if(!isRead) {
            props.mail.isRead = !isRead
            setIsRead(!isRead)
            props.onChangeRead(props.mail)
        }
    }

    // hover:shadow-md
    return <div> 
        <div className={isRead? "inline-block bg-gray-100 right-0" : ""}  style={ isRead? { width:"calc(100% - 256px)", height:"40px" } : { }}>
            <div className="inline-block align-middle px-2 py-2">{isStarred? <IoStar className="cursor-pointer" color="#ffd500" size="22" onClick={() => onChangeStar()} /> : <IoStarOutline className="cursor-pointer" color="lightGrey" size="22" onClick={() => onChangeStar()} /> }</div>
            <Link href={`/mail/${props.mail.uid}?type=${props.type}`}>
                <div className="inline-block cursor-pointer" style={ isRead? { width:"calc(100% - 40px)" } : { width:"calc(100% - 296px)" }} onClick={() => onChangeRead()}>
                    <div className="inline-block text-xs align-middle pr-8 py-2">
                        {
                            mailUser.map((user, index) => {
                                let nameList = ""
                                if(index==0) nameList = user
                                else nameList += ", "+user

                                return nameList;
                            })
                        }
                    </div>
                    <div className="inline-block align-middle titleCover py-2">
                        <div className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{ props.mail.title }</div>
                    </div>
                    <div className="text-xs inline-block float-right pr-4 align-middle py-2">{ date }</div>
                </div>  
            </Link>
        </div>
        <hr />
        <style jsx>{`
            .titleCover {
                width: 45%
            }

            @media screen and (max-width: 1064px) {
                .titleCover {
                    width: 35%
                }
            }

            @media screen and (max-width: 872px) {
                .titleCover {
                    width: 23%
                }
            }
            
        `}</style>
    </div>
}