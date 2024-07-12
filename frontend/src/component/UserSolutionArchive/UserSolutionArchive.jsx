import React, { useEffect, useState } from "react";
import noise from '../../assets/noise.svg'
import ninjascroll from '../../assets/ninjascroll.png'
import axios from 'axios'
import Solution from "../Solution/Solution";


export default function UserSolutionArchive(){
    
    const [submission, setSubmission] = useState([])


    useEffect(()=>{
        try {
            
            async function getUserSubmission(){
                const fetchedUserSubmission = await axios.get(`${process.env.API_PREFIX}/users/get-user-submissions`, {withCredentials:'include'})
                if (fetchedUserSubmission) {
                    setSubmission(fetchedUserSubmission.data.data[0].solutions)
                }
            }

            getUserSubmission()
        } catch (error) {
            console.log("error while fetching the user Submissions" , error);
        }
    },[])

    return(
        <div className="font-mono font-bold min-h-screen w-full flex flex-col items-center overflow-hidden relative">
          <img src={noise} alt="" className="fixed top-0 left-0 w-full h-full object-cover opacity-70 z-0" />
            <div className="z-10 mt-60 w-1/2 min-h-full">
                <div className="flex-row flex p-3">
                    <img src={ninjascroll} alt=""  className="w-12 mr-2 "/>
                    <h1 className="text-3xl mt-2">User Scroll Archive</h1>
                </div>
                <div className="bg-black h-1 w-full mt-4"></div>
                <div className="p-2">  

                {
                    submission.map((s)=>{
                        return(
                            <Solution data={s}/>
                        )})
                    }
                </div>
            </div>
         </div>
    )   
}