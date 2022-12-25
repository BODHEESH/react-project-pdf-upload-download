import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import Countdown from "react-countdown";

import { otpverify, postUserRegister } from "../../../api/Requests/userRequests/UserRequsts";
import axios from "axios";

function SignupPage() {
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [confirm, SetConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [OtpError, setOtpError] = useState("");
    const [OtpModal, setOtpModal] = useState(false);
    const [OTP, setOTP] = useState("");
    const [UserDetails, setUserDetails] = useState({});
    const [Resend, setResend] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = (e) => {
        SetConfirm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name) {
                setErrorMessage("Name is required");
            } else if (name.length < 3) {
                setErrorMessage("Name must be atleast 3 characters");
            } else if (!name.match(/^[A-Za-z][A-Za-z ]*$/)) {
                setErrorMessage("Enter a valid name");
            } else if (!email) {
                setErrorMessage("Email is required");
            } else if (
                !email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
            ) {
                setErrorMessage("Enter a valid email");
            } else if (!password) {
                setErrorMessage("Password is required");
            } else if (password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else if (password != confirm) {
                setErrorMessage("Password does not matched");
            } else {
                const { data } = await postUserRegister({
                    name: name,
                    email: email,
                    password: password,
                })
                    
                
                console.log("data");
                console.log(data);
                if (data) {
                    if (data.user) {
                        setUserDetails(data.user);
                        setOtpModal(true);
                        setTimeout(() => {
                            setResend(true);
                        }, "20000");
                    } else {
                        setErrorMessage(data.msg);
                    }
                } else {
                    setErrorMessage("Something went wrong");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const onVerify = (e) => {
        e.preventDefault();
        const data = {
            OTP: OTP,
            user: UserDetails._id,
        };

        if (OTP.length < 6) {
            setOtpError("Enter A 6 digit Otp");
        } else {

            otpverify(data).then((response) => {
                console.log(response.data);
                if (response.data.verified) {
                    navigate("/home");
                }
                setOtpError(response.data.msg);
            });
        }
    };

    const resendOtp = async () => {
        await resendOtp(UserDetails) 
            .then((response) => {
                setResend(!Resend);
                setTimeout(() => {
                    setResend(true);
                }, "180000");
            });
    };

    return (
        <>
            <div className="bg-gray-200 h-[100vh]">
                <div className="flex justify-center align-middle backgroundimage h-[100vh] ">
                    <form
                        className=" signupForm  rounded-md bg-white m-2 shadow-xl lg:w-1/3 p-5 border mt-8 text-blue-600 border-gray-100 "
                        onSubmit={handleSubmit}
                    >
                        <h1 className="text-2xl text-center font-bold lg:text-4xl">
                            Signup
                        </h1>
                        <p className="pb-4 text-center text-gray-500 mb-4">Welcome. User</p>
                        {errorMessage && (
                            <div
                                className="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"
                            >
                                {errorMessage}{" "}
                            </div>
                        )}

                        <div className="mb-2">
                            <label className="text-black"> Name </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => SetName(e.target.value)}
                                className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                            />
                        </div>

                        <div className="mb-2">
                            <label className="text-black"> Email Address </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => SetEmail(e.target.value)}
                                className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-black"> Password </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => SetPassword(e.target.value)}
                                className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="text-black"> Confirm Password </label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={handleConfirm}
                                className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="mt-2 h-10 w-1/4 rounded-full bg-blue-600 p-2 text-xl text-center font-semibold text-white outline-none focus:ring">
                                Sign up
                            </button>
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <div className="flex justify-center my-5 rounded-full bg-gray-100 w-2/4 h-12">
                                    <h3 className="text-xl mt-2">Signup with </h3>
                                    <FcGoogle className="mt-3 ml-4 text-2xl" />
                                </div>
                                <div className="flex justify-between mt-8">
                                    <div>
                                        <Link to="/signin">
                                            <p>Already have an account ?</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {OtpModal ? (
                <div className=" absolute w-full h-full backdrop-blur-sm  py-20 px-3 flex items-center">
                    <div className="container mx-auto">
                        <div className="max-w-sm mx-auto md:max-w-lg">
                            <div className="w-full">
                                <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-64 py-3 rounded text-center">
                                    <h1 className="text-2xl font-bold">OTP Verification</h1>
                                    <div className="flex flex-col mt-4">
                                        <span>Enter the OTP you received at</span>
                                        <span className="font-bold">{UserDetails?.email}</span>
                                    </div>

                                    <div className=" flex justify-center pt-2">
                                        {Resend ? null : <Countdown date={Date.now() + 600000} />}
                                    </div>
                                    <div
                                        id="otp"
                                        className="flex flex-row justify-center text-center px-4 mt-5"
                                    >
                                        <OTPInput
                                            value={OTP}
                                            onChange={setOTP}
                                            autoFocus
                                            OTPLength={6}
                                            otpType="number"
                                            disabled={false}
                                        />
                                    </div>
                                    <p className="text-red-500 font-[8px] mb-3 pl-3">
                                        {OtpError}
                                    </p>

                                    <div className="flex justify-center text-center mt-5">
                                        {Resend ? (
                                            <button
                                                className="flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg px-2 py-1 "
                                                onClick={(e) => resendOtp(e)}
                                            >
                                                Resend
                                            </button>
                                        ) : (
                                            <button
                                                className="flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg px-2 py-1 "
                                                onClick={(e) => onVerify(e)}
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default SignupPage;
