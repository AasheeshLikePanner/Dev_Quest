import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ninjascroll from '../../assets/ninjascroll.png'
import AllComments from "../AllComments/AllComments";
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import fire from '../../assets/fire.svg'
import noise from '../../assets/noise.svg'
import {toast} from 'sonner'

export default function SolutionPage() {
    const [isLiked, setIsLiked] = useState(false)
    const [like, setLike] = useState(0);
    const [externalComments, setexternalComments] = useState(0)
    const location = useLocation();
    const logined = useSelector((state) => state.auth.status)
    const {data, user} = location.state || {};
    const {register, handleSubmit} = useForm();
    const loginedUser = useSelector((state) => state.auth.userData)


    const HandleCommentSubmit = async (formData) => {
        if(formData.comment !== ""){
            try {

                const response = await axios.post(`${process.env.API_PREFIX}/comments/create-comment` ,{content:formData.comment}, {withCredentials:'include'})
                const comments = await axios.post(`${process.env.API_PREFIX}/solutions/add-comment-insolution`, {solutionId:data._id, commentId:response.data.data._id}, {withCredentials:'include'})
                setexternalComments(externalComments + 1);
                toast.success("Yours Thought Added Successfully!!!")
            } catch (error) {   
                toast.error("Something went wrong while adding Thoughts!!!") 
                console.log("Error while Adding the Comment", error);
            }
        }
    }

    const handleLike = async () => {
        if (!isLiked) {
            try {
                console.log(loginedUser);
                const response = await axios.post(`${process.env.API_PREFIX}/likes/like-item`, {
                    itemId: data._id,
                    itemType: "Solution",
                    userId: loginedUser._id
                });
    
                if (response.status === 201) {
                    setLike(like + 1);
                    setIsLiked(true);
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
            setLike(data.likeCount)
        }
    }, [])

    return (
        <div className="select-none z-10 selection:bg-black selection:text-white font-mono font-bold min-h-0 w-full flex flex-col items-center justify-center overflow-hidden bg-white relative">
              <img src={noise} alt="" className="pointer-events-none fixed top-0 left-0 w-full h-full object-cover opacity-70 " />

            <div className="select-none  z-20 h-40 w-40 bg-black overflow-hidden rounded-full mt-60 outline-10 outline-dashed outline-gray-300 outline-offset-2">
                <img src={data.userDetail[0].avatar} alt="" className="select-none"/>    
            </div>

            <div className=" flex-row flex mt-4">
                <img src={ninjascroll} className="pointer-events-none select-none w-10 mr-2 -mt-2 z-10" alt="" />
                <h1 className="text-2xl">Scroll By: {data.userDetail[0].username}</h1>
            </div>
            <div className="z-20">
                <h1 className="text-2xl mt-10 z-20" >{data.title}</h1>
                <h2 className="text-sm ">{data.content}</h2>
            </div>

            <a href={data.link} className="mt-10 p-3 min-w-24 rounded-xl h-14 bg-gray-200 items-center flex justify-center">Check The Solution</a>
            <a onClick={handleLike} className=" relative flex items-end justify-end w-1/2 h-full mr-6 mb-2">
                    <img className="pointer-events-none w-6" src={fire} alt="" />
                    <h1 className="text-xl font-semiBold ml-2">{like}</h1>    
            </a>  

            <div className="bg-black w-1/2 h-1 mt-20"></div>

            {
                logined && 
                    <form onSubmit={handleSubmit(HandleCommentSubmit)} className="mt-5 w-1/2  p-5 min-h-20 bg-gray-100 z-20  rounded-full items-center flex   outline- outline-gray-300 outline-dashed" >
                        <textarea {...register("comment", {required:"Please enter the content"} )} type="text" className="text-gray-400 bg-gray-100 w-full h-full outline-none" placeholder="Add a Thought " />
                        <button type="submit" className="hover:bg-black hover:text-white bg-gray-300  h-10 w-20 rounded-xl ml-3">Add</button>
                    </form>
            }
            <AllComments data={data} user={user} type={"Solution"}  count={externalComments} ></AllComments>
        </div>
    );
}
