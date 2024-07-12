import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import logo from '../../assets/logo.png'
import {useDispatch} from 'react-redux'
import { logout } from "../../store/authSlice";
import Login from "../Login/Login";
import SignUp from "../Singup/Signup";
import { Toaster, toast } from 'sonner'




export default function Header(){
    const [status, setStatus] = useState(false);
    const [loginPage, setLoginPage] = useState(false);
    const [signupPage, setSignUpPage] = useState(false);

    const fetchStatus = useSelector((state) => state.auth.status)
    const dispatch = useDispatch()

    useEffect(()=>{
        setStatus(fetchStatus)
    },[fetchStatus])


    const openLoginPage = () => {
        setLoginPage(true)
    }
    const openSignUpPage = () => {
        setSignUpPage(true)
    }

    const handleLogOut = ()=> {
        toast.success("Adventurer Logout!!!")
        dispatch(logout())
    }

    const closeLoginPage = () => {
        setLoginPage(false)
    }
    
    const closeSignUpPage = () => {
        setSignUpPage(false)
    }

    return(
        <div className='hover:cursor-custom-hover selection:bg-black selection:text-white w-2/4 mt-60 items-center flex-col'>
            {
                loginPage && <Login loginClose={closeLoginPage}/>
            }
            {
                signupPage && <SignUp signupClose={closeSignUpPage}/>
            }
            <img src={logo} alt="" className='pointer-events-none select-none relative  w-80'/>
            <h2 className='font-mono font-bold ml-20'>DevQuest is an innovative platform where developers tackle daily coding challenges by creating unique web solutions. Each day, a new real-world problem is presented, and users can submit their website links along with a description of the technologies used. Engage with the community by liking and commenting on solutions, and enhance your skills through continuous practice and collaboration.</h2>
            <div className='ml-20 flex-row flex m-10'> 
            {status? <div className="flex-row flex">
                <button onClick={handleLogOut} className='mr-8 flex items-start justify-center z-10 w-32 h-16 rounded-full bg-black hover:bg-blue-500'>
                    <h1 className=' text-3xl text-white font-bold font-mono' >LogOut</h1>
                </button>
            </div>: <div className="flex-row flex m-10">
                <button onClick={openLoginPage} className='mr-8 flex items-start justify-center z-10 w-32 h-16 rounded-full bg-black hover:bg-blue-500'>
                    <h1 className=' text-3xl text-white font-bold font-mono' >Login</h1>
                </button>
                <button onClick={openSignUpPage} className='flex items-start justify-center z-10 w-32 h-16 rounded-full text-gray-300 hover:bg-gray-400 hover:text-white outline'>
                    <h1 className='text-3xl  font-bold font-mono' >SignUp</h1>
                </button>
            </div>}
            </div>
        </div>
    )
}