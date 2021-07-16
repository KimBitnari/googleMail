import Head from 'next/head'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import { IoMenu, IoSettingsOutline, IoFileTraySharp, IoStarSharp } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";
import { IoMdOptions, IoMdHelpCircleOutline, IoIosKeypad, IoMdSend } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

export default function Layout({ children, inbox, starred, sent, trash }) {
    return (
        <div>
            <Head>
                <title>Gmail</title>
            </Head>
            <header>
                <div className="p-2 flex">
                    <div className="pr-8 h-12 flex min-w-max" style={{ width:"238px" }}>
                        <div className="p-3 mx-1 inline-block align-middle cursor-pointer"><IoMenu size="30"/></div>
                        <div className="relative top-1 float-left">
                            <Link href="/">
                                <a className="inline-block align-middle">
                                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
                                    style={{ width:"129px" }} />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="flex h-14 min-w-max flex-auto px-2">
                        <div className="h-8 px-2.5 w-full">
                            <div className="bg-gray-100 relative rounded h-14" style={{ maxWidth:"720px" }}>
                                <div className="p-2 m-1 inline-block float-left cursor-pointer"><HiSearch size="30" /></div>
                                <div className="block relative float-left top-4"><input placeholder="메일 검색" className="bg-transparent" /></div>
                                <div className="p-2 m-1 right-0 cursor-pointer absolute"><IoMdOptions size="30" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-max">
                        <div className="p-2 m-1 inline-block cursor-pointer"><IoMdHelpCircleOutline size="30" /></div>
                        <div className="p-2 m-1 inline-block cursor-pointer"><IoSettingsOutline size="30" /></div>
                    </div>
                    <div className="min-w-max">
                        <div className="p-2 m-1 inline-block cursor-pointer"><IoIosKeypad size="30" /></div>
                        <div className="pt-1 px-2 mx-1 inline-block float-right cursor-pointer"><div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-700 text-white">김</div></div>
                    </div>
                </div>
            </header>
            <hr />
            <main>
                <div className="h-full float-left" style={{ width: "256px" }}>
                    <div className="flex shadow-md rounded-full h-14 py-2 px-3 w-36 cursor-pointer ml-3 my-4">
                        <img className="absolute" src="https://www.gstatic.com/images/icons/material/colored_icons/2x/create_32dp.png" width="42" />
                        <p className="my-2 ml-12">편지쓰기</p>
                    </div>
                    <div>
                        {inbox ? (<div className="bg-gray-200 rounded-r-full mr-4">
                                <div className="ml-6 h-8">
                                    <IoFileTraySharp className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">받은편지함</p>
                                </div>
                            </div>) : (<div className="mr-4">
                                <div className="ml-6 h-8">
                                    <IoFileTraySharp className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">받은편지함</p>
                                </div>
                            </div>)
                        }
                        {starred ? (<div className="bg-gray-200 rounded-r-full mr-4">
                                <div className="ml-6 h-8">
                                    <IoStarSharp className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">별표편지함</p>
                                </div>
                            </div>) : (<div className="mr-4">
                                <div className="ml-6 h-8">
                                    <IoStarSharp className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">별표편지함</p>
                                </div>
                            </div>)
                        }
                        {sent ? (<div className="bg-gray-200 rounded-r-full mr-4">
                                <div className="ml-6 h-8">
                                    <IoMdSend className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">보낸편지함</p>
                                </div>
                            </div>) : (<div className="mr-4">
                                <div className="ml-6 h-8">
                                    <IoMdSend className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">보낸편지함</p>
                                </div>
                            </div>)
                        }
                        {trash ? (<div className="bg-gray-200 rounded-r-full mr-4">
                                <div className="ml-6 h-8">
                                    <FaTrash className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">휴지통</p>
                                </div>
                            </div>) : (<div className="mr-4">
                                <div className="ml-6 h-8">
                                    <FaTrash className="absolute text-gray-500" size="24" />
                                    <p className="my-2 ml-12 text-gray-500">휴지통</p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                {children}
                <div></div>
            </main>
        </div>
    );
}