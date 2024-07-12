import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import fire from '../../assets/fire.svg'

export default function Solution({ data }) {
    const navigate = useNavigate();

    const handleSolutionClick = (e) => {
        e.preventDefault();
        navigate('/solution/comments', { state: {data, user:data.userDetail[0]} });
    };

    return (
        <div className="selection:bg-black selection:text-white p-1 relative bg-gray-200 w-full min-h-20 rounded-lg mt-2 cursor-pointer">
            <Link to="/solution/comments" onClick={handleSolutionClick} className="z-20 block">
                <div className="text-2xl  items-center flex flex-col justify-center">
                    <h1 className="text-lg text-gray-700 outline-4 outline-gray-200  p-2 outline-dashed ">{data.title}</h1>
                    <h2 className="p-4 text-xs hover:underline text-gray-600">{data.content}</h2>
                </div>
                
                <div className="ml-2 items-end w-full h-full flex">
                    {(
                        <div className=" ml-2 items-end w-full h-full flex">
                            <h2 className="text-xs text-gray-400">created By: {data.userDetail[0].username}</h2>
                        </div>
                    )}
                    <div className="relative flex items-end justify-end w-1/2 h-full mr-4">
                        <img className="w-3 mb-1 " src={fire} alt="" />
                        <h1 className="text-sm font-semiBold ml-1 text-gray-600">{data.likeCount}</h1>    
                    </div>  
                </div>
                
            </Link>
        </div>
    );
}
