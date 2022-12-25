import React from 'react'
import "./LandingPage.css"
import { GrDocumentPdf } from "react-icons/gr";
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>


            <div class="landing-page ">
                <div class="container h-[100vh]">
                    <div class="header-area">
                        <div class="logo">
                            <a href="" class="flex items-center">
                                <GrDocumentPdf className="text-3xl mr-3 sm:h-9 " />
                                <span class="self-center text-xl font-semibold whitespace-nowrap text-blue-600 hidden w-full md:block md:w-auto">PDF gallery</span>
                            </a>
                        </div>

                    </div>
                    <div className='flex justify-center  my-20'>
                        <div class="info">
                            <h1>PDF gallery </h1> <br/> <h4>powerful PDF uploader </h4>
                            <p>allow visitors to upload and download PDF files easily.</p>
                            <Link to="/signin">
                            <button>Get Started</button>
                            </Link>
                           
                        </div>
                        <div class="image mt-64 l">
                            <img className='shadow-x' src="https://cdn.shopify.com/app-store/listing_images/cc067c2e42033eda0c068fd76913e467/promotional_image/CM_r8ZObr_gCEAE=.png?height=720&width=1280" />
                        </div>
                    </div>

                    
                </div>
            </div>


        </div>
    )
}

export default LandingPage