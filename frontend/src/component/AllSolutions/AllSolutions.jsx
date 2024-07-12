import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import Solution from "../Solution/Solution";
import axios from 'axios'
import {useForm} from 'react-hook-form'


export default function AllSolutions(){

    const [solutions, setSolutions] = new useState([])
    const problemId = useSelector((state) => state.problem.problemData);
    const count = useSelector((state) => state.problem.submissionCount)

    useEffect(()=>{
        if(problemId){  
            async function getSolutions(){
                const response = await axios.post(`${process.env.VITE_API_PREFIX}/problems/get-solution-sorted`, {problemId:problemId._id})
                setSolutions(response.data.data[0].solutionDetail)
            }
            getSolutions();
        }
        else{
            console.log('There was some problem while fetching Problem');
        }
    },[problemId, count])

    return(
        <div className="selection:bg-black selection:text-white mt-10 w-2/4 min-h-0 font-mono font-bold">
            <div className=" h-1 w-full bg-black"></div>
            <h1 className="mt-5 text-xl mb-4">Submission Scrolls</h1>

            <div className="z-20">
            { 
                solutions && 
                solutions.map((s, index)=>{
                    return(
                       <Solution data={s} key={s.id || index}/>
                    )
                })
            }
            </div>
            <div className="bg-white h-20 w-20"></div>
        </div>
    )
}