import React, { useEffect, useRef } from "react";
import Header from "../Header/Header";
import Problem from "../Problem/Problem";
import AllSolutions from "../AllSolutions/AllSolutions";
import noise from '../../assets/noise.svg'
import { useGSAP } from "@gsap/react";


export default function Home(){


    return (
        <div className=" min-h-screen w-full flex flex-col items-center overflow-hidden relative">
          <img src={noise} alt="" className="fixed top-0 left-0 w-full h-full object-cover opacity-70 z-0" />

            <div className="relative z-10 w-full flex flex-col items-center">
                <Header />
                <Problem />
                <AllSolutions />
            </div>
            
    </div>
      );
}