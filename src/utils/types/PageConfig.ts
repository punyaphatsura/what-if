export type TransitionPageConfigType = {
  [key: string]: {
    nextPage: string;
    img1: { path: string; width: number; height: number };
    text1: string;
    img2: { path: string; width: number; height: number };
    buttonText: string;
  };
};

export type QuestionPageConfigType = {
  [key: string]: {
    question: string;
    options: {
      text: string;
      nextPage: string;
      score: string;
    }[];
    buttonText: string;
    img: { path: string; width: number; height: number };
  };
};
