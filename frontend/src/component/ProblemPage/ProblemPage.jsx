import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import AllComments from "../AllComments/AllComments";
import axios from 'axios'
import noise from '../../assets/noise.svg'
import { Toaster, toast } from 'sonner'
import logo from '../../assets/logo.png'


export default function ProblemPage(){
    const location = useLocation();
    const {problemState} = location.state || {};
    const user = useSelector((state) => state.auth.userData)
    const [externalComments, setexternalComments] = useState(0)
    const logined = useSelector((state) => state.auth.status)
    const {register, handleSubmit} = useForm();




    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {

          const formattedLine = line.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`);
    
          if (formattedLine.startsWith('##')) {
            return <h2 key={index} className="text-2xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: formattedLine.replace('## ', '') }}></h2>;
          }
          if (formattedLine.startsWith('* ')) {
            return <li key={index} dangerouslySetInnerHTML={{ __html: formattedLine.replace('* ', '') }}></li>;
          }
          if (formattedLine) {
            return <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} className="mb-2"></p>;
          }
          return <br key={index} />;
        });
    };

    const HandleCommentSubmit = async (formData) => {
        if(formData.comment !== ""){
            try {
                const response = await axios.post(`${process.env.VITE_API_PREFIX}/comments/create-comment` ,{content:formData.comment}, {withCredentials:'include'})
                const comments = await axios.post(`${process.env.VITE_API_PREFIX}/problems/add-commentin-problem`, {problemId:problemState._id, commentId:response.data.data._id}, {withCredentials:'include'})
                setexternalComments(externalComments + 1);
                toast.success("Yours Thought Added Successfully!!!")
            } catch (error) {  
                toast.error("Something went wrong while adding Thoughts!!!") 
                console.log("Error while Adding the Comment", error);
            }
        }
    }
    



    return(
        <div className="selection:bg-black selection:text-white flex-col w-full min-h-0 items-center font-mono font-black flex justify-center">
          <img src={noise} alt="" className="pointer-events-none fixed top-0 left-0 w-full h-full object-cover opacity-70 -z-10" />

            <div className="min-h-0 w-2/4 mt-80 items-center flex-col  justify-center flex">
                <img src={logo} alt="" className="mb-10 w-60" />
                <div>
                    <h1 className="text-3xl m-3">{renderContent(problemState.title.replace("Title", 'Quest'))}</h1>
                    <h2 className="text-sm mt-3">{renderContent(problemState.content)}</h2>
                </div>
            <div>
                </div>
                <div className="bg-black h-1 w-full mt-20"></div>
                {
                logined && 
                    <form onSubmit={handleSubmit(HandleCommentSubmit)} className="mt-5 w-full  p-5 min-h-20 bg-gray-100  rounded-full items-center flex   outline- outline-gray-300 outline-dashed" >
                        <textarea {...register("comment", {required:"Please enter the content"} )} type="text" className="text-gray-400 bg-gray-100 w-full h-full outline-none" placeholder="Add a Thought " />
                        <button type="submit" className="hover:bg-black hover:text-white bg-gray-300  h-10 w-20 rounded-xl ml-3">Add</button>
                    </form>
                }
               

            </div>
            <div className="w-full items-center justify-center flex">
                    <AllComments data={problemState} user={user} type={"Problem"} count={externalComments} ></AllComments>
            </div>   
            
        </div>
    )
}