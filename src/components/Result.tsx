import React from "react";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";

const Result = () => {
  return (
    <div className="relative">
      <a
        href="/result/m-export.png"
        download={"m-export.png"}
        className="absolute right-4 top-4"
      >
        <MdOutlineFileDownload className="h-8 w-8" />
      </a>

      <Image
        src={"/result/m-result.svg"}
        alt=""
        width={1920}
        height={1080}
        layout="responsive"
        objectFit="contain"
        objectPosition="center"
        className="aspect-auto h-screen w-full"
      />
    </div>
  );
};

export default Result;
