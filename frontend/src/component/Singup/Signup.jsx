import React from "react";
import {useForm} from 'react-hook-form'
import noise from '../../assets/noise.svg'
import axios from 'axios'
import { Toaster, toast } from 'sonner'


export default function SignUp(props){
    
    const {register, handleSubmit} = useForm();

    const handleSignUp = async(data) => {
        try {
            
            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('avatar', data.avatar[0]); // Append the first file from the avatar field
            await axios.post(`${process.env.VITE_API_PREFIX}/users/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            props.signupClose();
        } catch (error) {
            toast.error('Something Went While registering the User')
            console.log('Something Went Wrong While registering the User', error);
        }
        try {
            const response = await axios.post(`${process.env.VITE_API_PREFIX}/users/login`, {
                email: data.email,
                password: data.password
            }, {withCredentials:'include'});
            toast.success("Adventurer logined successfully!!!")
        } catch (error) {
            toast.error('Something Went While Login the User')
            console.log('Something Went Wrong While Login the User', error);
        }
    }
    
    const closeSignUp = () => {
        props.signupClose()
    }

    return(
          <div className="ml-60 w-full min-h-96 max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg fixed z-20 ">
                <h1 className="font-mono font-bold ml-24 text-4xl">SignUp</h1>
                <img src={noise} alt="" className='w-screen h-screen object-cover opacity-70 fixed -z-10'/>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="mt-12 ml-5 font-mono text-lg w-72 h-14  rounded-full outline-dashed outline-gray-400">
                        <input {...register("fullName", {required:"Please enter the fullname"})} name="fullName"  className="mt-4 ml-5 font-extrabold outline-none" type="text" placeholder="fullname" />
                    </div>
                    <div className="mt-3 ml-5 font-mono text-lg w-72 h-14  rounded-full outline-dashed outline-gray-400">
                        <input {...register("username", {required:"Please enter the username"})} name="username"  className="mt-4 ml-5 font-extrabold outline-none" type="text" placeholder="username" />
                    </div>
                    <div className="mt-3 ml-5 font-mono text-lg w-72 h-14  rounded-full outline-dashed outline-gray-400">
                        <input {...register("email", {required:"Please enter the email"})} name="email"  className="mt-4 ml-5 font-extrabold outline-none" type="text" placeholder="you@email.com" />
                    </div>
                    <div className="mt-3  ml-5 font-mono text-lg w-72 h-14  rounded-full outline-dashed outline-gray-400">
                        <input {...register("password", {required:"Please enter the password"})} name="password"  className="mt-4 ml-5 font-extrabold outline-none" type="text" placeholder="password" />
                    </div>
                    <div className="flex items-center justify-center w-full mt-3">
                        <label className="flex items-center px-4 py-2 bg-black text-white rounded-full shadow-md border  cursor-pointer hover:bg-blue-500 hover:text-white">
                            <svg className="w-8 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.5 3a2.5 2.5 0 0 1 2.5 2.5V17a2.5 2.5 0 0 1-2.5 2.5H3a2.5 2.5 0 0 1-2.5-2.5V5.5A2.5 2.5 0 0 1 3 3h13.5zM3 2h13.5A3.5 3.5 0 0 1 20 5.5V17a3.5 3.5 0 0 1-3.5 3.5H3A3.5 3.5 0 0 1-.5 17V5.5A3.5 3.5 0 0 1 3 2zm3.5 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm2 6a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2H9.5a1 1 0 0 0-1 1zm-5-8A2.5 2.5 0 1 0 8 7.5 2.5 2.5 0 0 0 3.5 3.5z"/>
                            </svg>
                            <span className="text-base leading-normal">Select a avatar</span>
                            <input 
                            type="file"
                            accept="image/*"
                            {...register('avatar', { required: true })}
                            className="hidden"
                            />
                        </label>
                     </div>
                    
                    <button type="submit" className='ml-24 mt-5 flex items-start justify-center z-10 w-32 h-16 rounded-full bg-black hover:bg-blue-500'>
                    <h1 className=' text-3xl text-white font-bold font-mono' >SignUp</h1>
                </button>
                </form>
                <button 
                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    onClick={closeSignUp}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
         </div>
      );

}