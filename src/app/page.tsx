'use client';
import HomeScreen from '@/components/HomeScreen';
import MainFlow from '@/components/MainFlow';
import Result from '@/components/Result';
import axios from 'axios';
import { useEffect, useState } from 'react';
import transitionPageConfig from '../app/config/transitionPageConfig.json';
import questionPageConfig from '../app/config/questionPageConfig.json';
import useImagePreloader from '@/utils/hooks/useImagePreloader'; // Import the preloader hook
import { TransitionPageConfigType, QuestionPageConfigType } from '@/utils/types/PageConfig';

const tconfig: TransitionPageConfigType = transitionPageConfig;
const qconfig: QuestionPageConfigType = questionPageConfig;

export default function Home() {
  const [state, setState] = useState(0);
  const [choice, setChoice] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  const [imageList, setImageList] = useState<string[]>([]);

  useEffect(() => {
    setImageList(
      [
        ...Object.values(tconfig).flatMap((config) => [config.img1.path, config.img2.path]),
        ...Object.values(qconfig).flatMap((config) => config.img.path),
        `/result/f-export.png`,
        `/result/m-export.png`,
        `/result/t-export.png`,
      ].filter((path) => path !== '')
    );
  }, []);

  const { imagesPreloaded } = useImagePreloader(imageList);

  const handleClick = () => {
    setTransitioning(true);
    setTimeout(() => {
      setState((prevState) => (prevState + 1) % 3);
      setTransitioning(false);
    }, 300);
  };

  return (
    <main className={`flex h-[100svh] flex-col items-center justify-between overflow-hidden`}>
      <div className={`transition-all ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {state === 0 && <HomeScreen handleClick={handleClick} />}
        {state === 1 && <MainFlow setChoice={setChoice} setState={handleClick} />}
        {state === 2 && <Result choice={choice} />}
      </div>
    </main>
  );
}
