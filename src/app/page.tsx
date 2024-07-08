"use client";
import HomeScreen from "@/_components/HomeScreen";
import MainFlow from "@/_components/MainFlow";
import Result from "@/_components/Result";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState(0);

  const handleClick = () => {
    setState((prevState) => (prevState + 1) % 3);
  };

  useEffect(() => {
    const test = async () => {
      const res = await axios.get("http://localhost:3000/api/home");
      console.log(res.data);
    };
    test();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p onClick={handleClick} className="cursor-pointer">
        jnajodnawjdnij
      </p>
      {state === 0 && <HomeScreen />}
      {state === 1 && <MainFlow />}
      {state === 2 && <Result />}
    </main>
  );
}
