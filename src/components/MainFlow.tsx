'use client'

import React from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import questionPageConfig from "../app/config/questionPageConfig.json";
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
type QuestionPageConfig = {
  [key: string]: {
    question: string;
    options: {
      text: string;
      nextPage: string;
      score: string;
    }[];
    buttonText: string;
    img: { path: string, width: number, height: number };
  };
};

const tconfig: TransitionPageConfig = transitionPageConfig;
const qconfig: QuestionPageConfig = questionPageConfig;

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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-wi-pink to-wi-lemon p-10">
      {img1.path && (
        <Image 
          src={img1.path} 
          alt="img1" 
          width={img1.width} 
          height={img1.height} 
          className="mb-4"
        />
      )}
      <h1 className="bg-gray-700 text-white p-4 rounded-lg mb-4 text-center">
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
        className="bg-wi-primary text-white py-2 px-6 rounded-full transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

const QuestionPage = ({ pageIdx, setPageIdx }: { pageIdx: string, setPageIdx: (idx: string) => void }) => {
  const { question, options, buttonText, img } = qconfig[pageIdx];
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-wi-pink to-wi-lemon p-10">
      <h1 className="bg-wi-primary text-white text-center p-4 rounded-lg mb-6">
        {question}
      </h1>
      <div className="flex flex-col space-y-4 mb-6">
        {options.map((option, idx) => (
          <button
            key={idx}
            className="bg-white text-wi-primary p-3 rounded-full shadow-md transition duration-300"
            onClick={() => setPageIdx(option.nextPage)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <button
        onClick={() => setPageIdx(options[0].nextPage)}
        className="bg-wi-primary text-white py-2 px-6 rounded-full transition duration-300"
      >
        {buttonText}
      </button>
      {img.path && (
        <Image
          src={img.path}
          alt="illustration"
          width={img.width}
          height={img.height}
          className="mt-8"
        />
      )}
    </div>
  );
};

export default MainFlow;
