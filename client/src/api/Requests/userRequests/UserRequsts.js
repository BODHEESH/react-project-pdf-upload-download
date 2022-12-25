import Axios from "../../Axios";

export const postUserRegister = (userData) => Axios.post('/user-register' , userData)

export const postUserLogin = (userData) => Axios.post('/user-login' , userData)

export const uploadpdf = (data) => Axios.post('/upload' , data) 
export const otpverify = (verifyotp) => Axios.post('/verifyOtp' , verifyotp) 
export const resendOtp = (otpresend) => Axios.post('/resendOtp' , otpresend) 


