'use client'

import React from "react";
import transitionPageConfig from "../app/config/transitionPageConfig.json";
import Image from 'next/image';

type TransitionPageConfig = {
  [key: string]: {
    nextPage: string;
    img1: string;
    text1: string;
    img2: string;
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
  return (
    <div className="bg-green-500">
      <h1>{tconfig[pageIdx].text1}</h1>
      <Image src={tconfig[pageIdx].img1} alt="img1" width={500} height={500}/>
      <button onClick={() => setPageIdx(tconfig[pageIdx].nextPage)}>
        tconfig[pageIdx].
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
