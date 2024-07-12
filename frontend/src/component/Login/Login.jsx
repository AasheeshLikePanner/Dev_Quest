import React from "react";
import { useForm } from 'react-hook-form';
import noise from '../../assets/noise.svg';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from "../../store/authSlice";
import { Toaster, toast } from 'sonner'




export default function Login(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${process.env.API_PREFIX}/users/login`, {
        email: data.email,
        password: data.password
      }, {withCredentials:'include'});
      toast.success("Adventurer Login Successfully!!!")
      dispatch(login(response.data.data.user));
      closeLogin()

    } catch (error) {
      toast.warning('There was some problem while login!!!')
    }
  };

  const closeLogin = () => {
    props.loginClose();
  };

  return (
    <div className="ml-52 w-full h-96 max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg fixed z-20">
      <h1 className="font-mono font-bold ml-24 text-4xl">Login</h1>
      <img src={noise} alt="" className='w-screen h-screen object-cover opacity-70 fixed -z-10' />
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mt-12 ml-5 font-mono text-lg w-72 h-14 rounded-full outline-dashed outline-gray-400">
          <input 
            {...register("email", { required: "Please enter the email" })} 
            className="mt-4 ml-5 font-extrabold outline-none" 
            type="text" 
            placeholder="you@email.com" 
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="mt-5 ml-5 font-mono text-lg w-72 h-14 rounded-full outline-dashed outline-gray-400">
          <input 
            {...register("password", { required: "Please enter the password" })} 
            className="mt-4 ml-5 font-extrabold outline-none" 
            type="password" 
            placeholder="password" 
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <button type="submit" className='ml-24 mt-5 flex items-start justify-center z-10 w-32 h-16 rounded-full bg-black hover:bg-blue-500'>
          <h1 className='text-3xl text-white font-bold font-mono'>Login</h1>
        </button>
        <button 
          type="button" 
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900" 
          onClick={closeLogin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
    </div>
  );
}
