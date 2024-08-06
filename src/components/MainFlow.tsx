"use client";

import React from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import questionPageConfig from "../app/config/questionPageConfig.json";
import Image from "next/image";
import {
  TransitionPageConfigType,
  QuestionPageConfigType,
} from "@/utils/types/PageConfig";

const tconfig: TransitionPageConfigType = transitionPageConfig;
const qconfig: QuestionPageConfigType = questionPageConfig;

const MainFlow = () => {
  const [pageIdx, setPageIdx] = React.useState("P1");
  if (["P1", "P2", "P3", "P8"].includes(pageIdx)) {
    return <TransitionPage pageIdx={pageIdx} setPageIdx={setPageIdx} />;
  } else {
    return <QuestionPage pageIdx={pageIdx} setPageIdx={setPageIdx} />;
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
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-300 to-yellow-200 p-10">
      {img1.path && (
        <Image
          src={img1.path}
          alt="img1"
          width={img1.width}
          height={img1.height}
          className="mb-4"
        />
      )}
      <h1 className="mb-4 rounded-lg bg-gray-700 p-4 text-center text-white">
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
        className="rounded-full bg-green-500 px-6 py-2 text-white transition duration-300 hover:bg-green-700"
      >
        {buttonText}
      </button>
    </div>
  );
};

const QuestionPage = ({
  pageIdx,
  setPageIdx,
}: {
  pageIdx: string;
  setPageIdx: (idx: string) => void;
}) => {
  const { question, options, buttonText, img } = qconfig[pageIdx];
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-300 to-yellow-200 p-10">
      <h1 className="mb-6 rounded-lg bg-green-500 p-4 text-center text-white">
        {question}
      </h1>
      <div className="mb-6 flex flex-col space-y-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            className="rounded-full bg-white p-3 text-green-500 shadow-md transition duration-300 hover:bg-green-100"
            onClick={() => setPageIdx(option.nextPage)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <button
        onClick={() => setPageIdx(options[0].nextPage)}
        className="rounded-full bg-green-500 px-6 py-2 text-white transition duration-300 hover:bg-green-700"
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
