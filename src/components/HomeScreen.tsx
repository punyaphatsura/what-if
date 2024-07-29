"use client";
import React from "react";
import Image from "next/image";
interface HomeScreenProps {
  handleClick: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ handleClick }) =>  {
  return (
    <div className="flex min-h-screen items-center justify-between " onClick={handleClick}>
        <div >
          <div className="relative" >
          <Image src="/images/bg_text_home.png" alt="bg" width={600} height={600} />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center" >     
          Who you are   <br />
          if you aren't a medical <br />
          student?
          </div>
        </div>

    </div>
  );
};

export default HomeScreen;
