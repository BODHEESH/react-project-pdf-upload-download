import React, { useEffect } from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { GrDownload } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useState } from 'react';

function UserHome({ change }) {
    
    const user = useSelector((state) => state.user)
    const [pdfData, setPdfdata] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const token = localStorage.getItem('usertoken')

    useEffect(() => {
        const fetchpdf = async () => {
            const response = await axios.get(`http://localhost:5000/uplodedfiles/user-dashboard/${user._id}`)
            setPdfdata(response.data.arrayCopy)

        }
        fetchpdf();

    }, [change])

    let userId = user._id;
    const deleteData = async (id) => {
        try {
            alert(id)

            const response = await axios.delete(`http://localhost:5000/delete/${id}`,{userId})
            alert("successfyllly delete")
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <div className="overflow-y-hidden rounded-lg border mx-3">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-700 h-[8vh] text-center text-sm font-semibold uppercase tracking-widest text-white">
                                <th className="px-5 py-3">File Name</th>
                                {/* <th className="px-5 py-3">Created At</th> */}
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500">
                            {pdfData.map((obj) => {
                                return (
                                    <tr className='text-center'>
                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="whitespace-no-wrap font-semibold ">{(obj.fileName.substring(0,20))}</p>
                                        </td>

                                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                            <p className="flex justify-around m-5">
                                                <a
                                                    className="text-blue-400  p-4 font-mono"
                                                    href={PF + obj.fileName}
                                                    download
                                                >
                                                    {" "}
                                                    <i className="text-2xl "><GrDownload /></i>
                                                </a>

                                                <i className="text-2xl" onClick={() => { deleteData(obj._id) }}><RiDeleteBinLine /></i>
                                            </p>
                                        </td>
                                       

                                    </tr>
                                )
                            })}
                        </tbody>






                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserHome