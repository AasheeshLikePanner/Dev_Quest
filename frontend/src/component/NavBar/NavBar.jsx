import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import fire from '../../assets/fire.svg'
import ninjascroll from '../../assets/ninjascroll.png'
import HistoryIcon from '@mui/icons-material/History';
import SolutionSubmitPage from "../SolutionSubmitPage/SolutionSubmitPage";
import { useSelector } from "react-redux";


export default function NavBar(){
    const [solutionPageOpen, setSolutionPageOpen] = useState(false)
    const fetchLike = useSelector((state) => state.auth.userData);

    const handleHome = () => {

    }

    const closeSolutionPage = () => {
        console.log('close the page');
        setSolutionPageOpen(false);
    }

    const openSolutionCard = () => {
        setSolutionPageOpen(true)
    }

    return(
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-20 mb-20">
            {solutionPageOpen && <SolutionSubmitPage closepage={closeSolutionPage} />}
            
            <div className=" fixed bottom-20 left-1/2 transform -translate-x-1/2 shadow-lg bg-[#fdfdfd] p-2 pl-3 pr-3 rounded-full flex items-center justify-center outline outline-3 outline-gray-300 max-w-fit">
                <Link to="/" onClick={handleHome}>
                    <HomeIcon sx={{ "&:hover": { color: "black" }, fontSize: 30, color: "gray" }} />
                </Link>

                {fetchLike && (
                    <div className="ml-4 flex items-center justify-center">
                        <Link to="/user-scroll-archive" onClick={handleHome}>
                            <HistoryIcon sx={{ fontSize: 30, "&:hover": { color: "black" }, color: "gray" }} className="mr-4" />
                        </Link>
                        <button onClick={openSolutionCard} className="hover:bg-blue-400 mr-3 w-20 bg-black h-10 p-2 items-center justify-center flex rounded-full">
                            <h1 className="select-none text-white font-mono font-bold">Scroll</h1>
                        </button>
                        <div className="flex items-center justify-center hover:opacity-100 opacity-50">
                            <img src={fire} alt="" className="w-6 mr-1" />
                            <h1 className="font-mono text-2xl mt-1 font-bold">{fetchLike.wins || 0}</h1>
                        </div>
                        <div className="rounded-full h-9 ml-3 overflow-hidden w-9">
                            <img src={fetchLike.avatar} alt="" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}