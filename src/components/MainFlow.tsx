'use client'

import React from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import Image from 'next/image';

type TransitionPageConfig = {
  [key: string]: {
    nextPage: string;
    img1: { path: string, width: number, height: number };
    text1: string;
    img2: { path: string, width: number, height: number };
    buttonText: string;
  };
};

const tconfig: TransitionPageConfig = transitionPageConfig;

const MainFlow = () => {
  const [pageIdx, setPageIdx] = React.useState('P1');
  if (['P1', 'P2', 'P3', 'P8'].includes(pageIdx)) {
    return <TransitionPage pageIdx={pageIdx} setPageIdx={setPageIdx} />;
  } else {
    return <QuestionPage pageIdx={pageIdx} setPageIdx={setPageIdx} />;
  }
};

const TransitionPage = ({ pageIdx, setPageIdx }: { pageIdx: string, setPageIdx: (idx: string) => void }) => {
  const { nextPage, img1, text1, img2, buttonText } = tconfig[pageIdx];
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-300 to-yellow-200">
      {img1.path && (
        <Image 
          src={img1.path} 
          alt="img1" 
          width={img1.width} 
          height={img1.height} 
          className="mb-4"
        />
      )}
      <h1 className="bg-gray-700 text-white p-4 rounded-lg mb-4">
        {text1}
      </h1>
      {img2.path && (
        <Image 
          src={img2.path} 
          alt="img2" 
          width={img2.width} 
          height={img2.height} 
          className="mb-4"
        />
      )}
      <button 
        onClick={() => setPageIdx(nextPage)}
        className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

const QuestionPage = ({ pageIdx, setPageIdx }: { pageIdx: string, setPageIdx: (idx: string) => void }) => {
  return (
    <div className="bg-blue-500">QuestionPage</div>
  );
}

export default MainFlow;
