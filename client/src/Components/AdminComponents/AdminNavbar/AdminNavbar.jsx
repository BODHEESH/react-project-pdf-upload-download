import React from 'react'
import { GrDocumentPdf } from "react-icons/gr";
import "./AdminNavbar.css"
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function AdminNavbar() {

  const navigate = useNavigate()

  const logout =()=>{
      // localStorage.removeItem("admintoken")
      // localStorage.removeItem("admin")
      navigate("/adminlogin")
  }
  return (
    <div>
       
        <div>

            <nav class="navbar border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-green-400">
                <div class="container flex flex-wrap items-center justify-between mx-auto h-16">
                    <a href="" class="flex items-center">
                        <GrDocumentPdf className="text-3xl mr-3 sm:h-9 text-white" />
                        <span class="pdfGallery self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden w-full md:block md:w-auto">PDF gallery</span>
                    </a>
                    <div class=" w-50 md:block xs:w-20 md:w-auto" id="navbar-default">
                        <div className=" flex items-center">
                            <div className="flex space-x-1">
                                <input
                                    type="text"
                                    className="searchbox block w-96 px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Search..."
                                />
                                <button className="px-4 text-green-600 bg-gray-100 rounded-full ">
                                    <svg
                                        xmlns=""
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={logout} class='LogoutButton py-2 px-4 bg-transparent text-white font-semibold border border-white rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>Logout</button>
                        <AiOutlineLogout className='logoutIcon hidden text-3xl mr-1 mx-2 sm:h-9' />
                    </div>

                </div>
            </nav>
        </div>
    </div>
  )
}

export default AdminNavbar