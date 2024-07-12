import { useEffect, useState } from 'react'
import noise from './assets/noise.svg'
import {NavBar} from './component/index'
import axios from 'axios'
import { login } from './store/authSlice'
import {useDispatch} from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.API_PREFIX}/users/current-user`, {
            withCredentials: true
            });
            dispatch(login(response.data.data));
            console.log("Login successful from cookies");
        } catch (error) {
            console.log("Error while loging in from cookies", error);
        }
      };

      fetchData();
  }, []);


  return (
    <div className="scrollbar scrollbar-thumb-black scroll-smooth	 cur min-h-0 w-screen flex flex-col justify-center items-center overflow-hidden bg-hite relative selection:bg-black selection:text-white">
        
    </div>
  )
}


export default App
