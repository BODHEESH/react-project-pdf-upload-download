import React from 'react'
import Navbar from '../../Components/UserComponents/Navbar/Navbar'
import UploadPDF from '../../Components/UserComponents/Upload/UploadPDF'

function Home() {
  return (
    <div className='bg-gray-100'>
        <Navbar />
        <UploadPDF />
       
    </div>
  )
}

export default Home