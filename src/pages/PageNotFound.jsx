import React from 'react'
import NotFound from '../data/404_page.jpg'
import {useNavigate} from "react-router-dom"

const PageNotFound = () => {
    
  let navigate = useNavigate();
const handleClick = ()=>{
    navigate("/home")
}
    return (
        <div className="bg-indigo-900 relative overflow-hidden h-screen w-screen zIndex-99">
            <img src={NotFound} alt="404 Not found" className="absolute h-full w-full object-cover" />
            <div className="inset-0 bg-black opacity-25 absolute">
            </div>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div className="w-full font-mono flex flex-col items-center relative z-10">
                    <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                        You are all alone here
                    </h1>
                    <button onClick={handleClick} class="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">Go back </button>
                    <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                        404
                    </p>
                </div>
            </div>
        </div>

    )
}

export default PageNotFound