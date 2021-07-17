import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'
import { useDispatch, useSelector } from 'react-redux'

export default function DetailMails (props) {
    const mailList = useSelector((state) => state.user.mailLists)
    const userList = useSelector((state) => state.user.userLists)
    const [mailInfo, setMailInfo] = useState({})

    useEffect(() => {
        const selectMail = mailList.filter(list => list.uid == props.mail.uid);
        const selectUser = userList.filter(list => list.uid == selectMail[0].senderOfuid)

        const payload = {
            name: selectUser[0].name,
            email: selectUser[0].email,
            content: selectMail[0].content,
            date: selectMail[0].date
        }
        setMailInfo(payload)
    },[]);

    return <div className="inline-block pl-16 mt-3 right-0" style={{ width:"calc(100% - 256px)" }}>
        <div className="break-all mr-3">
            <div className="inline-block">
                <div className="inline-block text-sm font-bold">{mailInfo.name}</div>
                <div className="inline-block text-xs text-gray-500 ml-1">{'<'}{mailInfo.email}{'>'}</div>
            </div>
            <div className="inline-block text-xs float-right">{mailInfo.date}</div>
        </div>
        <div className="break-all mt-2 mb-5 mr-3 text-sm">{mailInfo.content}</div>
    </div>
}