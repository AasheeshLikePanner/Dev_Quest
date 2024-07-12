import React from "react";
import {useForm} from 'react-hook-form'
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeSumbissionCount } from "../../store/problemSlice";

export default function SolutionSubmitPage(props){
    const {register, handleSubmit, formState: { errors }} = useForm();
    const problemId = useSelector((state) => state.problem.problemData);
    const dispatch = useDispatch();
    
    const closeSolutionPage = () => {
        props.closepage();
    }


    const handleSolutionSubmit = async (data) => {
        if(data.content !== "" && data.title !== "" && data.link !== ""){
            const mutedWords = ["porn",'prn','fuck','nude','sex','girl']
            if (mutedWords.some((words) => data.title.includes(words))) {
                
                return;    
            }
            try {
                
                const createdSolutoin = await axios.post(`${process.env.VITE_API_PREFIX}/solutions/create-solution`, {link:data.link, content:data.content, title:data.title}, {withCredentials:"include"})
                const AddedSolutions = await axios.post(`${process.env.VITE_API_PREFIX}/problems/add-solution`, {problemId, solutionId:createdSolutoin.data.data._id}, {withCredentials:'include'})
                const addInUserSubmission = await axios.post(`${process.env.VITE_API_PREFIX}/users/add-solution-to-user-submissions`, {solutionId:createdSolutoin.data.data._id}, {withCredentials:'include'})
                dispatch(changeSumbissionCount())
                props.closepage();
            } catch (error) {
                console.log("Error While Adding the solution", error);
            }
        }
    }



    return(
        <div className=" w-screen min-h-screen bottom-0 fixed items-center flex justify-center">
            <div className="ml-26 min-w-90 min-h-96 max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg fixed z-20">
            <h1 className="font-mono font-bold ml-20 text-4xl">Solution</h1>
            {/* <img src={noise} alt="" className='w-screen h-screen object-cover opacity-70 fixed -z-10' /> */}
                <form onSubmit={handleSubmit(handleSolutionSubmit)}>
                    <div className="mt-12 ml-5 font-mono text-lg w-72 h-14 rounded-full outline-dashed outline-gray-400">
                    <input 
                        {...register("title", { required: "Please enter the Title" })} 
                        className="mt-4 ml-5 font-extrabold outline-none" 
                        type="text" 
                        placeholder="Your Solution Title" 
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="mt-5 ml-5 font-mono text-lg w-72 h-14 rounded-full outline-dashed outline-gray-400">
                    <input 
                        {...register("link", { required: "Please enter the Link" })} 
                        className="mt-4 ml-5 font-extrabold outline-none" 
                        type="text" 
                        placeholder="link of Website" 
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <div className="mt-5 ml-5 font-mono text-lg w-72 min-h-14 rounded-full outline-dashed outline-gray-400">
                    <textarea 
                        {...register("content", { required: "Please enter the Link" })} 
                        className="mt-4 ml-5 relative  font-extrabold outline-none" 
                        type="link" 
                        placeholder="explain your solution" 
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <button type="submit" className='ml-24 mt-5 flex items-start justify-center z-10 w-32 h-16 rounded-full bg-black hover:bg-blue-500'>
                    <h1 className='text-3xl text-white font-bold font-mono'>Submit</h1>
                    </button>
                    <button 
                    type="button" 
                    className="absolute top-2 right-2 text-gray-300 hover:text-gray-900" 
                    onClick={closeSolutionPage}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}