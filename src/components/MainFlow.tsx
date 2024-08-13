"use client";

import React, { FC, useEffect, useState } from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import questionPageConfig from "../app/config/questionPageConfig.json";
import calculateScore from "../utils/functions/calculateScore";
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
  const [answers, setAnswers] = useState<{ page: string, choice: string }[]>([]);

  const nextPageHandler = (currentPage: string, choice: string, nextPage: string) => {
    setAnswers([...answers, { page: currentPage, choice }]);
    setPageIdx(nextPage);
  };

  useEffect(() => {
    console.log(JSON.stringify(answers)); // Log the updated answers state
  }, [answers]);

  if (['P1', 'P2', 'P3', 'P8'].includes(pageIdx)) {
    return <TransitionPage 
      pageIdx={pageIdx} 
      setPageIdx={setPageIdx} />;
  } else {
    return <QuestionPage 
      pageIdx={pageIdx} 
      nextPageHandler={nextPageHandler} 
      setState={setState} 
      setChoice={setChoice}
      prevAnswers={answers} 
    />;
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
    <div className="flex h-screen flex-col items-center justify-center">
      {img1.path && (
        <Image
          src={img1.path}
          alt="img1"
          width={img1.width}
          height={img1.height}
          className="mb-4"
        />
      )}
      <h1 className="mb-4 rounded-3xl bg-gray-700 p-4 text-center text-wi-primary">
        <p
          dangerouslySetInnerHTML={{ __html: text1.replace(/\n/g, "<br/>") }}
        />
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
        className="rounded-full bg-wi-primary px-6 py-2 text-white transition duration-300"
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
  prevAnswers,
}: {
  pageIdx: string;
  nextPageHandler: (
    currentPage: string,
    choice: string,
    nextPage: string,
  ) => void;
  setState: (state: number) => void;
  setChoice: (choice: string) => void;
  prevAnswers: { page: string; choice: string }[];
}) => {
  const { question, options, buttonText, img } = qconfig[pageIdx];
  const [nextPage, setNextPage] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-6 rounded-3xl bg-wi-primary p-4 text-center text-gray-700">
        <p
          dangerouslySetInnerHTML={{ __html: question.replace(/\n/g, "<br/>") }}
        />
      </h1>
      <div className="mb-6 flex flex-col space-y-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`${
              selectedIdx === idx ? "bg-gray-400" : "bg-white"
            } rounded-full p-3 text-gray-700 shadow-md outline outline-wi-primary transition duration-300`}
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
          if (nextPage === "") {
            return;
          }
          if (nextPage === 'final'){
            // Assuming last page doesn't have any scorings to the options
            const result = calculateScore(prevAnswers);
            setChoice(result);
            console.log(result);
            setState(2);
            return;
          }
          nextPageHandler(pageIdx, options[selectedIdx!].score, nextPage);
          setNextPage("");
          setSelectedIdx(null);
        }}
        className="rounded-full bg-wi-primary px-6 py-2 text-gray-700 transition duration-300"
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
