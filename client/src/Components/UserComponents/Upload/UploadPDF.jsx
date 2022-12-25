import axios from "axios";
import React, { useState } from "react";
import { GoCloudUpload } from "react-icons/go";
import { uploadpdf } from "../../../api/Requests/userRequests/UserRequsts";
import UserHome from "../UserHome/UserHome";

function UploadPDF() {
  const user = JSON.parse(localStorage.getItem("user"))
  const [errorMessage, setErrorMessage] = useState('')
  const [uploaded, setUploaded] = useState(true)

  const [file,setFile] = useState(null)

  const fileHandler = (e)=>{
      setFile(e.target.files[0])
      console.log(e.target.files[0])
  }

  const submitHandler =async(e)=>{
    e.preventDefault()
 
    const data = new FormData();
   
    data.append("pdf", file)
    data.append("userId",user._id)

    try {
    const result =  await uploadpdf(data)
     if(result.data.message =="Please upload a valid pdf file"){
      setErrorMessage("Please upload a valid pdf file")
     }else if(result.data.message=="successfully uploaded"){
      setUploaded(!uploaded)
      alert("Uploaded successfully")
     }else{
      alert("Something went wrong")
     }

    } catch (error) {
      console.log(error);
    }
  }

console.log(uploaded);

  return (
    <>
    <div className="flex justify-center text-center bg-slate-100">
      <form onSubmit={submitHandler}>
        <label for="file" className="shareOptions">
          <div className="w-[50vw] h-36 pt-6 bg-slate-200 mx-1 my-4 border-dashed border-2 border-sky-500 rounded-2xl flex justify-center align-middle shadow-xl">
            <div className="flex flex-col  justify-center ">
              <div className="item">
                <GoCloudUpload className="text-6xl w-full " />
                <span className="shareOptionText">Upload your pdf files here</span>
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                name="pdf"
                id="file"
                onChange={fileHandler}
              />

             
              <button className="class='LogoutButton  mb-4 py-1 px-4 bg-transparent text-dark font-semibold border border-gray-500 rounded hover:bg-green-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'">Submit</button>
              {errorMessage && <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
            </div>
          </div>
        </label>
      </form>
    </div>
    <div>
      <UserHome change= {uploaded} />
    </div>
    </>
  );
}

export default UploadPDF;
