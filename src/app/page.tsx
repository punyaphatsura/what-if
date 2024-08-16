'use client';
import HomeScreen from '@/components/HomeScreen';
import MainFlow from '@/components/MainFlow';
import Result from '@/components/Result';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [state, setState] = useState(0);
  const [choice, setChoice] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  const handleClick = () => {
    setTransitioning(true);
    setTimeout(() => {
      setState((prevState) => (prevState + 1) % 3);
      setTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const test = async () => {
      const res = await axios.get('/api/home');
      console.log(res.data);
    };
    test();
  }, []);

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
