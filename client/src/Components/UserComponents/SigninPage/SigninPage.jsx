import axios from 'axios';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { postUserLogin } from '../../../api/Requests/userRequests/UserRequsts';

function SigninPage() {

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
                const { data } = await postUserLogin({
                    email: email,
                    password: password
                })
                
                if (data) {
                    if (data.user) {
                       
                        navigate("/home"); 
                        localStorage.setItem('user', JSON.stringify(data.user))
                        localStorage.setItem('usertoken',(data.token))
                       
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
        <div className='bg-gray-100'>
            <div className='flex justify-center align-middle backgroundimage h-[100vh]'>
                <form className="rounded-md bg-white m-10 shadow-xl lg:w-1/3 p-10 border mt-20 text-blue-600 border-gray-100 " onSubmit={handleSubmit}>
                    <h1 className="text-2xl text-center font-bold lg:text-4xl">Sign in Here</h1>
                    <p className="pb-4 text-center text-gray-500 mb-10">Explore your pdf world</p>
                   
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
                        <button className="mt-2 h-12 w-3/4 rounded-full bg-blue-600 p-2 text-2xl text-center font-semibold text-white outline-none focus:ring">Login</button>
                    </div>
                    <div >
                
                        <div>
                            <div className="flex justify-between">
                                <div className="flex justify-center my-5 rounded-full bg-gray-100 w-2/4 h-10">
                                    <h3 className="text-xl mt-2">Signin with </h3>
                                    <FcGoogle className="mt-3 ml-4 text-2xl" />
                                </div>
                                <div className="flex justify-between mt-8">
                                    <div>
                                    <Link to="/signup"><p>Don't have an account ?</p></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SigninPage