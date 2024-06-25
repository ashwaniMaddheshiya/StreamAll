"use client";

import Image from "next/image";
import addIcon from "/public/icons/add.svg";
import facebook from "/public/icons/facebook.svg";
import instagram from "/public/icons/instagram.svg";
import twictch from "/public/icons/twitch.svg";
import youtube from "/public/icons/youtube.svg";
import { useState } from "react";

const LiveModalContent = () => {
  const [showDestList, setShowDestList] = useState(false);
  return (
    <div className="w-[40vw]">
      <div className="text-2xl font-medium">Create Live Stream</div>
      <div className="mt-4 ">
        <div className="text-lg text-gray-600 mb-4">Select Destinations</div>
        <div
          className="relative flex w-fit border-[1px] border-blue-600 p-2 rounded-3xl text-blue-600 cursor-pointer hover:text-blue-700 hover:border-blue-700"
          onClick={() => setShowDestList(true)}
        >
          <Image src={addIcon} alt="add" width={20} height={20} />
          Add Destinations
        </div>
      </div>
      {showDestList && (
        <div className="absolute bg-white p-3 z-10 shadow-2xl rounded-lg w-60">
          <ul className="cursor-pointer">
            <li className="flex items-center gap-3 py-2 hover:bg-slate-100">
              <Image src={youtube} alt="Youtube" width={25} height={25} />
              YouTube
            </li>
            <li className="flex items-center gap-3 py-2 hover:bg-slate-100">
              <Image src={facebook} alt="Youtube" width={25} height={25} />
              Facebook
            </li>
            <li className="flex items-center gap-3 py-2 hover:bg-slate-100">
              <Image src={instagram} alt="Youtube" width={25} height={25} />
              Instagram
            </li>
            <li className="flex items-center gap-3 py-2 hover:bg-slate-100">
              <Image src={twictch} alt="Youtube" width={25} height={25} />
              Twitch
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LiveModalContent;
