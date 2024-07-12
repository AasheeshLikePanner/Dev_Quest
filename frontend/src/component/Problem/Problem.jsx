import React, { useEffect, useState } from "react";
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { createProblem } from "../../store/problemSlice";
import { Link, useNavigate } from "react-router-dom";


export default function Problem(){
    const [timer, setTimer] = useState("00:00:00");
    const  [title, setTitle] = useState("Problem Title")
    const [description, setDescription] = useState("Problem Description")
    const [problemId, setProblemId] = useState('66713320c75921cf3787755f');
    const [problemState, setProblemState] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formatTime = (time) => {
      return time < 10 ? `0${time}` : time;
    };
  
    useEffect(() => {
      const calculateTimeLeft = () => {
        const currentTime = new Date();
        const resetTime = new Date(currentTime);
  
        if (currentTime.getHours() >= 6) {
          resetTime.setDate(resetTime.getDate() + 1);
        }
        
        resetTime.setHours(6, 0, 0, 0); 
  
        const timeDiff = resetTime - currentTime;
  
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
  
        return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
      };
  
      const updateTimer = () => {
        setTimer(calculateTimeLeft());
      };
  
      const handleReset = async () => {

        const responce = await axios.get(`${process.env.VITE_API_PREFIX}/problems/create-problem`)
        setTitle(responce.data.data.title)
        setDescription(responce.data.data.content);
        dispatch(createProblem(responce.data.data))
        setProblemId(responce.data.data._id)

        updateTimer();
      };
      
      const handleWinner = async () => {
        try {
          const mostLikeSolution = await axios.post(`${process.env.VITE_API_PREFIX}/problems/get-most-like-solution`, {problemId})
          const updatingUser = await axios.post(`${process.env.VITE_API_PREFIX}/users/increase-user-wins`, {userId:mostLikeSolution.data.data[0].userId})
        } catch (error) {
          console.log("Error While Updating UserWin", error); 
        }
      } 


      
      updateTimer();
      
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        if (currentTime.getHours() === 6 && currentTime.getMinutes() === 0 && currentTime.getSeconds() === 0) {
          handleReset();
          handleWinner()
        } else {
          updateTimer();
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  

    useEffect(()=>{
      async function getProblem(){
        const response = await axios.post(`${process.env.VITE_API_PREFIX}/problems/get-problem`,{problemId})
        setTitle(response.data.data.title.replace("Title", 'Quest'))
        setDescription(response.data.data.content)
        setProblemState(response.data.data)
        dispatch(createProblem(response.data.data))
      }
      getProblem()
    },[problemId])

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
    
    const handleSolutionClick = (e) => {
      e.preventDefault();
      navigate('problem/comments', { state: {problemState} });
  };

    return(
        <div className="hover:cursor-custom-hover curosr-custom-normal selection:bg-black selection:text-white w-2/4 mt-40 flex-col items-center justify-center flex min-h-0 font-mono font-bold">
            <div className=" w-full font-mono font-bold h-20 text-3xl mr-20">
                <h1 className="text-sm">New Quest In</h1>
                <h1 className="mr-10">{timer}</h1>
            </div>
            <div className="bg-black w-full h-1"> </div>
            <h1 className="text-4xl m-3">{renderContent(title)}</h1>
            <h2 className="text-sm mt-2">{renderContent(description)}</h2>
            <div className="items-center flex justify-start w-full">
              <Link to='problem/comments' onClick={handleSolutionClick} className="hover:underline items-center flex text-1xl z-10 w-96 h-14 bg-gray-200 rounded-2xl mt-5 "> 
                <h1 className="ml-4 text-gray-700 ">Discussion about Quest</h1>
              </Link>
            </div>
        </div>
    )
}