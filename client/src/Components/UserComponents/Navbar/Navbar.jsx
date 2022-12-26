import React, { useState } from 'react'
import { GrDocumentPdf } from "react-icons/gr";
import "./navbar.css"
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';


function Navbar() {

    const [search, setSearch] = useState('')
    const [fileFound, setfileFound] = useState([])
    const [searchModal, setSearchModal] = useState(false)
    const navigate = useNavigate()

    const user = useSelector((state) => state.user)

    const logout =()=>{
        localStorage.removeItem("usertoken")
        localStorage.removeItem("user")
        navigate("/signin")
    }


    const handleSearch = async (e) => {
        try {
          if (e.target.value.length > 0) { 
            setSearchModal(true)
          } else {
            setSearchModal(false)
          }
          const search = e.target.value
          userId=user._id
          const file = await axios.put(`http://localhost:5000/search`, { search ,userId})
          console.log(file.data);
          setfileFound(file.data,"adadaad")
        } catch (error) {
        }
    
      }

    return (
        <>
        <div>

            <nav class="navbar border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-blue-600">
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
                                    placeholder="Search using file name..." onChange={handleSearch}
                                />
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
        {searchModal ? (
        <>

          <div className="p-10 mr-8  justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-xl shadow-lg relative flex flex-col min-w-[300px] bg-gray-100   ">
                {fileFound.map((u) => (
                  <div className="flex">
                    <div className="p-4 flex  items-center">
                     
                      <h1>{u.fileName}</h1>
                      
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>



        </>
      ) : null}
        </>
    )
}

export default Navbar
