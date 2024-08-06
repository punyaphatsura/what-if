"use client";
import React from "react";
import Image from "next/image";
import localFont from "next/font/local";

interface HomeScreenProps {
  handleClick: () => void;
}

const myFont = localFont({
  src: "../fonts/Layiji_JaRaKeFadHangV1.ttf", // Path to your font file
});

const HomeScreen: React.FC<HomeScreenProps> = ({ handleClick }) => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      onClick={handleClick}
    >
      <div>
        <div className="relative">
          <div className="relative flex-col items-center justify-center">
            <Image
              src="/images/bg_text_home.png"
              alt="bg"
              width={600}
              height={600}
            />
          </div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center ${myFont.className}`}
          >
            Who you are <br />
            if you aren&apos;t a medical <br />
            student?
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
