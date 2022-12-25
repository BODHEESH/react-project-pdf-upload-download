
import React from 'react'

import { Navigate,Outlet } from 'react-router-dom'


function HomeProtect() {
    let auth = {"token":localStorage.getItem("usertoken")}
    console.log(auth)
    return (
        auth.token ? <Outlet /> : <Navigate to={"/signin"} />
        )
  
}

export default HomeProtect