'use client'

import React, { FC, useState } from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import questionPageConfig from "../app/config/questionPageConfig.json";
import Image from 'next/image';
import next from "next";

interface Props {
  setState: (state: number) => void;
  setChoice: (choice: string) => void;
}

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

const MainFlow:FC<Props> = ({setState, setChoice}) => {
  const [pageIdx, setPageIdx] = useState('P1');
  if (['P1', 'P2', 'P3', 'P8'].includes(pageIdx)) {
    return <TransitionPage pageIdx={pageIdx} setPageIdx={setPageIdx} />;
  } else {
    return <QuestionPage pageIdx={pageIdx} setPageIdx={setPageIdx} setState={setState} setChoice={setChoice} />;
  }
};

const TransitionPage = ({ pageIdx, setPageIdx }: { pageIdx: string, setPageIdx: (idx: string) => void }) => {
  const { nextPage, img1, text1, img2, buttonText } = tconfig[pageIdx];
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {img1.path && (
        <Image 
          src={img1.path} 
          alt="img1" 
          width={img1.width} 
          height={img1.height} 
          className="mb-4"
        />
      )}
      <h1 className="bg-gray-700 text-wi-primary p-4 rounded-3xl mb-4 text-center">
        <pre>
          {text1}
        </pre>
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

const QuestionPage = ({ pageIdx, setPageIdx, setState, setChoice }: { pageIdx: string, setPageIdx: (idx: string) => void, setState: (state: number) => void, setChoice: (choice: string) => void }) => {
  const { question, options, buttonText, img } = qconfig[pageIdx];
  const [nextPage, setNextPage] = useState('');
  const [selectedIdx, setSelectedIdx] = useState<number|null>(null);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="bg-wi-primary text-gray-700 text-center p-4 rounded-3xl mb-6">
        <pre>
          {question}
        </pre>
      </h1>
      <div className="flex flex-col space-y-4 mb-6">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`${
              selectedIdx === idx ? 'bg-gray-400' : 'bg-white'
            } outline outline-wi-primary text-gray-700 p-3 rounded-full shadow-md transition duration-300`}
            onClick={() => {
              setNextPage(option.nextPage);
              setSelectedIdx(idx);
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          if (nextPage === ''){
            return;
          }
          if (nextPage === 'final'){
            //setChoice('final')
            setState(2);
            return;
          }
          setPageIdx(nextPage)
          // save choice
          setNextPage('')
          setSelectedIdx(null)
        }}
        className="bg-wi-primary text-gray-700 py-2 px-6 rounded-full transition duration-300"
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
