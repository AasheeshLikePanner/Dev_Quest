import React, { useEffect, useState } from "react";
import AllComments from "../AllComments/AllComments";
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import noise from '../../assets/noise.svg'
import {toast} from 'sonner'

export default function CommentPage(){
    const user = useSelector((state) => state.auth.userData)
    const location = useLocation();
    const {data} = location.state || {};
    const logined = useSelector((state) => state.auth.status)
    const {register, handleSubmit} = useForm();
    const [externalComments, setexternalComments] = useState(0)


    const HandleCommentSubmit = async (formData) => {
        if(formData.comment !== ""){
            try {

                const response = await axios.post(`${process.env.VITE_API_PREFIX}/comments/create-comment` ,{content:formData.comment}, {withCredentials:'include'})
                const comments = await axios.post(`${process.env.VITE_API_PREFIX}/comments/add-comment`, { commentId:data.data._id,AddcommentId:response.data.data._id}, {withCredentials:'include'})
                setexternalComments(externalComments + 1);
                toast.success("Yours Thought Added Successfully!!!")
            } catch (error) {   
                toast.error("Something went wrong while adding Thoughts!!!") 
                console.log("Error while Adding the Comment", error);
            }
        }
    }

    return(
        <div className="p-10 selection:bg-black selection:text-white font-mono font-bold min-h-0 w-full flex flex-col items-center justify-center">
          <img src={noise} alt="" className="pointer-events-none fixed top-0 left-0 w-full h-full object-cover opacity-70 -z-10" />
            
            <div className=" mt-80 items-center flex-col justify-center flex">
                <h1 className="text-2xl">
                    Thoughts By: {data.data.user_Detail[0].username}
                </h1>
                <h2 className="mt-5 text-sm">{data.data.content}</h2>
                <h3></h3>
            </div>
            <div className="h-1 bg-black w-2/4 mt-20 "></div>
            {
                logined && 
                    <form onSubmit={handleSubmit(HandleCommentSubmit)} className="mt-5 w-1/2  p-5 min-h-15 bg-gray-100  rounded-full items-center flex   outline- outline-gray-300 outline-dashed" >
                        <textarea {...register("comment", {required:"Please enter the content"} )} type="text" className="text-gray-400 bg-gray-100 w-full h-10 outline-none" placeholder="Add a Thought " />
                        <button type="submit" className="hover:bg-black hover:text-white bg-gray-300  h-10 w-20 rounded-xl ml-3">Add</button>
                    </form>
            }
            <AllComments data={data} type={"Comment"}  count={externalComments} ></AllComments>
        </div>
    )
}