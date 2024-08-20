import React from 'react';
import Image from 'next/image';
import { MdOutlineFileDownload } from 'react-icons/md';
import useImagePreloader from '@/utils/hooks/useImagePreloader'; // Adjust the import path as needed

interface ResultProps {
  choice: string;
}

const Result: React.FC<ResultProps> = ({ choice }) => {
  const imageList = [
    `/result/${choice.toLowerCase()}-result.svg`,
    `/result/${choice.toLowerCase()}-export.png`,
  ];

  const imagesPreloaded = useImagePreloader(imageList);

  if (!imagesPreloaded) {
    // Show a loading spinner or placeholder while images are preloading
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader h-16 w-16 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-wi-primary"></div>
      </div>
    );
  }

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
