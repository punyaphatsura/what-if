'use client';
import React from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';

interface HomeScreenProps {
  handleClick: () => void;
}

const myFont = localFont({
  src: '../fonts/Layiji_JaRaKeFadHangV1.ttf', // Path to your font file
});

const HomeScreen: React.FC<HomeScreenProps> = ({ handleClick }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center" onClick={handleClick}>
      <div>
        <div className="relative">
          <div className="relative flex flex-col items-center justify-center">
            <Image
              src="/images/bg_text_home.png"
              alt="bg"
              width={800}
              height={800}
              className="w-6/7 h-auto max-w-[350px]"
            />
          </div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center ${myFont.className} text-xl text-white`}>
            Who are you <br />
            if you aren&apos;t a medical <br />
            student?
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
