import React, { useEffect, useState } from "react";
import axios from 'axios'
import Comment from "../Comment/Comment";

export default function AllComments(data){
    const [comments, SetComments] = useState([])


    useEffect(()=>{
        if(data.type === "Solution"){
            async function getComments(){
                const response = await axios.post(`${process.env.VITE_API_PREFIX}/solutions/get-allcomment-ofsolution`, {solutionId:data.data._id})
                SetComments(response.data.data[0].comment_Detail)
            }
            getComments() 
        }else if(data.type === "Problem"){
            async function getComments(){
                const response = await axios.post(`${process.env.VITE_API_PREFIX}/problems/get-allcomment-ofproblem`,{problemId:data.data._id})
                SetComments(response.data.data[0].comment_Detail)
            }
            getComments();
        }   
        else{
            async function getComment(){
                const response = await axios.post(`${process.env.VITE_API_PREFIX}/comments/get-allcomment-ofcomment`, {commentId:data.data.data._id})
                SetComments(response.data.data[0].comment_Detail)

            }       
            getComment()
        }
    }, [data.count])

    return(
       <div className="selection:bg-black selection:text-white mb-20 w-2/4 min-h-0 flex flex-col items-center">
            <div className="w-full min-h-20 mt-5 flex-col flex items-center">
                {
                    comments && 
                    comments.map((com) => {
                       return <Comment data={com} key={com.id}/>
                    })
                }
            </div>
       </div> 
    )
}