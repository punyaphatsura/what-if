import React from 'react';
import Image from 'next/image';
import { MdOutlineFileDownload } from 'react-icons/md';

interface ResultProps {
  choice: string;
}

const Result: React.FC<ResultProps> = ({ choice }) => {
  return (
    <div className="relative">
      <a
        href={`/result/${choice.toLowerCase()}-export.png`}
        download={`${choice.toLowerCase()}-export.png`}
        className="absolute right-4 top-4">
        <MdOutlineFileDownload className="h-8 w-8" />
      </a>

      <Image
        src={`/result/${choice.toLowerCase()}-result.svg`}
        alt=""
        width={1920}
        height={1080}
        layout="responsive"
        objectFit="contain"
        objectPosition="center"
        className="aspect-auto h-[100svh] w-full max-w-[450px]"
      />
    </div>
  );
};

export default Result;
