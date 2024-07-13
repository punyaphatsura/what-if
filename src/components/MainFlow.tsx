'use client'

import React from "react";

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
      <h1>{pageIdx}</h1>
      <button onClick={() => setPageIdx('P2')}>Go to next page</button>
    </div>
  );
};

const QuestionPage = ({ pageIdx, setPageIdx }: { pageIdx: string, setPageIdx: (idx: string) => void }) => {
  return (
    <div className="bg-blue-500">QuestionPage</div>
  );
}

export default MainFlow;
