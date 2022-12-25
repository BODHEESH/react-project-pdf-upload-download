import React, { useEffect, useState } from 'react'
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrDownload } from "react-icons/gr";
import axios from 'axios';

function Dashboard() {

    const [userData, setuserData] = useState([])
    const [applicationList, setApplicationList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        name: '', address: '', email: '',
        phone: '', company_name: '', Incubation: '',
        image: '', status: ''
    });
    console.log(userData, "userdata+++++++++++++++++++++++++++++");

    useEffect(() => {
        const fetchuser = async () => {
            const response = await axios.get("http://localhost:5000/admin/allusers")
            setuserData(response.data.users)
        }
        fetchuser();

    }, [])


    const fullDetails = (id) => {
        userData.filter((list) => {
            if (list._id === id) {
                setModalData({
                    name: list.name, email: list.email,
                    status: list.status
                })
                setShowModal(true)
            }
        })
    }

    return (
        <>
        <div className='bg-gray-100'>
            <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
                <div class="flex items-center justify-between pb-6">
                    <div>
                        <h2 class="font-bold text-xl text-gray-700">User Details</h2>
                        <span class="text-xs text-gray-500">View accounts of registered users</span>
                    </div>

                </div>

                <div class="overflow-y-hidden rounded-lg border">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-green-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                    <th class="px-5 py-3">User Name</th>
                                    <th class="px-5 py-3">Email Id</th>
                                    <th class="px-5 py-3">Created at</th>
                                    <th class="px-5 py-3"> User Status</th>
                                    <th class="px-5 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-500">
                                {userData.map((obj) => {
                                    return (
                                        <tr>
                                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p class="whitespace-no-wrap font-semibold ">{obj.name}</p>
                                            </td>

                                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p class="whitespace-no-wrap">{obj.email}</p>
                                            </td>


                                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <p class="whitespace-no-wrap">{(obj.updatedAt.substring(0, 10))}</p>
                                            </td>

                                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">

                                                <p class="whitespace-no-wrap m-5">
                                                    {obj.isBlocked ? <i class="fa-solid fa-lock text-2xl text-red-600"><FaLock /></i> :
                                                        <i class="fa-solid fa-lock-open text-2xl text-green-700"><FaLockOpen /></i>
                                                    }


                                                </p>
                                            </td>

                                            <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">
                                                <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { fullDetails(obj._id) }}>Open</button></td>
                                                {/* <p class="flex justify-around m-5">
                                                    <i class="text-2xl "><GrDownload /></i>
                                                    <i class="text-2xl"><RiDeleteBinLine /></i>
                                                </p> */}
                                                {/* <div class="flex items-center justify-between">
                                                    <div class="ml-1 space-x-2 lg:ml-10">
                                                        <button class='bg-green-400 p-2 ml-5 rounded-full pl-5 pr-5 text-white'>view Files</button>
                                                    </div>

                                                </div> */}
                                            </td>

                                        </tr>

                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-center align-middle w-full h-96 rounded-lg  border-2 border-black'><div className='mt-40 text-4xl font-semibold'>Sorry !!! Currently No Users</div></div>
            </div>
        </div>
        {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">{modalData.company_name}</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <table>
                                        <tbody className='flex flex-col '>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Name : </th>
                                                <td width="200px">{modalData.name}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Email : </th>
                                                <td width="200px">{modalData.email}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Phone : </th>
                                                <td width="200px">{modalData.phone}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Address : </th>
                                                <td width="200px">{modalData.address}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Incubation : </th>
                                                <td width="200px"> {modalData.Incubation}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%]'>Status : </th>
                                                <td width="200px">{modalData.status}</td>
                                            </tr>
                                            <tr className='pt-2'>
                                                <th className='text-right pr-2 w-[35%] align-top'>Logo : </th>
                                                <td width="200px"><img src={`/images/${modalData.image}`} alt="" className='w-[100px] ' /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default Dashboard