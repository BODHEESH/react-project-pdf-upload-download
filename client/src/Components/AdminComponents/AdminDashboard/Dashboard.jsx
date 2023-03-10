import React, { useEffect, useState } from 'react'
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrDownload } from "react-icons/gr";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [userData, setuserData] = useState([])
   
    useEffect(() => {
        const fetchuser = async () => {
            const response = await axios.get("http://localhost:5000/admin/allusers")
            setuserData(response.data.users)
        }
        fetchuser();
    }, [])


    const fullDetails = (id) => {
        const fetchfiles = async () => {
            const response = await axios.get("http://localhost:5000/admin/allusers")
            setuserData(response.data.users)
        }
        fetchfiles();
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
                                                    <Link to={`/adminfiles/${obj._id}`}>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">

                                                            <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">Open</button>
                                                        </td>

                                                    </Link>
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
            
        </>
    )
}

export default Dashboard