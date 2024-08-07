"use client";

import React, { FC, useEffect, useState } from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import questionPageConfig from "../app/config/questionPageConfig.json";
import Image from 'next/image';
import next from "next";
import { log } from "console";


import {
  TransitionPageConfigType,
  QuestionPageConfigType,
} from "@/utils/types/PageConfig";

interface Props {
  setState: (state: number) => void;
  setChoice: (choice: string) => void;
}

const tconfig: TransitionPageConfigType = transitionPageConfig;
const qconfig: QuestionPageConfigType = questionPageConfig;

const MainFlow:FC<Props> = ({setState, setChoice}) => {
  const [pageIdx, setPageIdx] = useState('P1');
  const [log, setLog] = useState<{ page: string, choice: string }[]>([]);

  const nextPageHandler = (currentPage: string, choice: string, nextPage: string) => {
    setLog([...log, { page: currentPage, choice }]);
    setPageIdx(nextPage);
  };

  useEffect(() => {
    console.log(JSON.stringify(log)); // Log the updated log state
  }, [log]);

  if (['P1', 'P2', 'P3', 'P8'].includes(pageIdx)) {
    return <TransitionPage pageIdx={pageIdx} setPageIdx={setPageIdx} />;
  } else {
    return <QuestionPage pageIdx={pageIdx} nextPageHandler={nextPageHandler} setState={setState} setChoice={setChoice} />;
  }
};

const TransitionPage = ({
  pageIdx,
  setPageIdx,
}: {
  pageIdx: string;
  setPageIdx: (idx: string) => void;
}) => {
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

const QuestionPage = ({
  pageIdx,
  nextPageHandler,
  setState,
  setChoice,
}: {
  pageIdx: string;
  nextPageHandler: (currentPage: string, choice: string, nextPage: string) => void;
  setState: (state: number) => void;
  setChoice: (choice: string) => void;
}) => {
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
      <div className="mb-6 flex flex-col space-y-4">
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
            //setChoice(finalChoice);
            setState(2);
            return;
          }
          nextPageHandler(pageIdx, options[selectedIdx!].score, nextPage)
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
