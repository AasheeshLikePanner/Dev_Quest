import React, { useEffect, useState } from "react";
import fire from '../../assets/fire.svg'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import { useSelector } from "react-redux";

export default function Comment(data){
    const [isLiked, setIsLiked] = useState(false)
    const [like, setLike] = useState(0);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData)

    const handleLike = async () => {
        if (!isLiked) {
            try {
                console.log("Inside the like function");
                const response = await axios.post(`${process.env.VITE_API_PREFIX}/likes/like-item`, {
                    itemId: data.data._id,
                    itemType: "Comment",
                    userId: data.data.user_Detail[0]._id
                });
    
                if (response.status === 201) {
                    setLike(like + 1);
                    setIsLiked(true);
                    toast.success("👍 Comment Liked Successfully!!!")
                } else {
                    console.error("Unexpected response:", response);
                }
            } catch (error) {
                console.error("Error while liking the item:", error);
            }
        }
    }
    

    useEffect(()=> {
        if(data){
            setLike(data.data.likeCount)
        }
    }, [])

    const navigateToCommentPage = (e) => {
        e.preventDefault()
        navigate("/comment/comments", {state:{data}})
        window.location.reload();
    }

    return(
        <div  className="mt-1 select-none items-center flex flex-col justify-center font-mono font-bold rounded-2xl w-full min-h-20 bg-gray-200">
           
            <div className="text-balance w-full min-h-0 p-4 overflow-hidden break-words">
                <Link onClick={navigateToCommentPage} to={"/comment/comments"} className="text-sm hover:underline">
                    {data.data.content}
                </Link>              
            </div>
            <div className="w-full ml-5 flex-row  items-center flex justify-end">
                <h2 className="text-xs w-full text-gray-400"> Traveler's Note by {data.data.user_Detail[0].username}</h2>
                <a onClick={handleLike} className="flex items-end justify-end min-w-0 h-full mr-6 mb-2">
                    <img className="w-6 mb-1" src={fire} alt="" />
                    <h1 className="text-xl font-semiBold ml-1">{like}</h1>    
                </a>  
            </div>
        </div>
    )
}