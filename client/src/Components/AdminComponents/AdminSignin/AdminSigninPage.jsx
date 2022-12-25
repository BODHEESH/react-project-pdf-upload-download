import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { postAdminLogin } from '../../../api/Requests/adminRequests/AdminRequests';


function AdminSigninPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
             if (!email) {
                setErrorMessage("Email is required");
            } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                setErrorMessage("Enter a valid email");
            } else if (!password) {
                setErrorMessage("Password is required");
            } else if (password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else {
                const { data } = await postAdminLogin({
                    email: email,
                    password: password
                })
                
                if (data) {
                    if (data.user) {
                       
                        navigate("/admindashboard"); 
                        localStorage.setItem('admin', JSON.stringify(data.admin))
                        localStorage.setItem('admintoken',(data.admintoken))
                       
                    } else {
                        console.log(data.msg)
                        setErrorMessage(data.msg)
                    }
                }else{
                    console.log(data.msg)
                    setErrorMessage('Something went wrong')
                }
            }
        } catch (error) {
            setErrorMessage('Something went wrong')
            console.log(error.message);
        }
    }


  return (
    <div>
        <div className='bg-gray-100'>
            <div className='flex justify-center align-middle backgroundimage h-[100vh]'>
                <form className="rounded-md bg-white m-10 shadow-xl lg:w-1/3 p-10 border mt-20 text-green-400 border-gray-100 " onSubmit={handleSubmit}>
                    <h1 className="text-2xl text-center font-bold lg:text-4xl">PDF Gallery</h1>
                    <p className="pb-4 text-center text-gray-500 mb-10">Admin Login</p>
                   
                    {errorMessage && <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                    
                    <div className="mb-6">
                        <label className="text-black"> Email Address </label>
                        <input type="email" value={email}  onChange={(e)=> {setEmail(e.target.value)}} className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3  outline-none focus:ring" />
                    </div>
                    <div className="mb-6">
                        <label className="text-black"> Password </label>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring" />
                    </div>

                    <div className='flex justify-center'>
                        <button className="mt-2 h-12 w-3/4 rounded-full bg-green-400 p-2 text-2xl text-center font-semibold text-white outline-none focus:ring">Login</button>
                    </div>
                  

                </form>
            </div>
        </div>
    </div>
  )
}

export default AdminSigninPage