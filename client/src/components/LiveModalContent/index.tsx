"use client";

import Image from "next/image";
import addIcon from "/public/icons/add.svg";
import facebook from "/public/icons/facebook.svg";
import instagram from "/public/icons/instagram.svg";
import twitch from "/public/icons/twitch.svg";
import youtube from "/public/icons/youtube.svg";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { myFetch } from "@/utils/myFetch";
import { baseUrl } from "@/constants";
import { usePlatform } from "@/context/platforms";
import { useRouter } from "next/navigation";

const imageMap = {
  YouTube: youtube,
  FaceBook: facebook,
  Instagram: instagram,
  Twitch: twitch,
};

const LiveModalContent = () => {
  const [showDestList, setShowDestList] = useState(false);
  const [destList, setDestList] = useState<string[]>([]);
  const [platformData, setPlatformData] = useState([]);
  const [title,setTitle] = useState("")
  const { data: session, status } = useSession();
  const {platformList} = usePlatform()
  const router = useRouter();

  const handleDestination = async (destination: string) => {
    // if (!destList.includes(destination)) {
    //   setDestList([...destList, destination]);
    // }
    // setShowDestList(false);
    signIn('google')
  };

  const handleCreateLiveStream = () => {
    router.push(`/create?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="w-[40vw]">
      <div className="text-2xl font-medium">Create Live Stream</div>
      <div className="mt-4 ">
        <div className="text-lg text-gray-600 mb-4">Select Destinations</div>
        <div className="flex gap-2 flex-wrap">
          {platformList.map((platform, index) => (
            <div
              className="relative flex gap-2 w-fit border-[1px] border-[#6750a4] p-2 rounded-3xl text-[#6750a4] cursor-pointer"
              key={index}
            >
              <Image src={imageMap[platform.platform]} alt={platform.platform} width={20} height={20} />
              {platform.platform}
            </div>
          ))}
          <div
            className="relative flex w-fit border-[1px] border-[#6750a4] p-2 rounded-3xl text-[#6750a4] cursor-pointer"
            onClick={() => setShowDestList(true)}
          >
            <Image src={addIcon} alt="add" width={20} height={20} />
            Add Destination
          </div>
        </div>

        <div className="my-8">
          <div className="text-md my-1 text-gray-600">Title</div>
          <input
            type="text"
            className="w-full outline-none p-2 border-[1px] border-[#ddd]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <div className="text-white bg-[#6750a4] hover:bg-[#564489] p-3 my-8 text-center rounded-lg cursor-pointer" onClick={handleCreateLiveStream}>
            Create Live Stream
          </div> */}
          <button
            className={`w-full text-white p-2 my-8 text-center rounded-lg cursor-pointer ${
              title ? 'bg-[#6750a4] hover:bg-[#564489]' : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleCreateLiveStream}
            disabled={!title}
          >
            Create Live Stream
          </button>
        </div>
      </div>
      {showDestList && (
        <div className="absolute top-[250px] bg-white p-3 z-10 shadow-2xl rounded-lg w-60">
          <ul className="cursor-pointer">
            <li
              className="flex items-center gap-3 py-2 hover:bg-slate-100"
              onClick={() => handleDestination("YouTube")}
            >
              <Image src={youtube} alt="Youtube" width={25} height={25} />
              YouTube
            </li>
            <li
              className="flex items-center gap-3 py-2 hover:bg-slate-100"
              onClick={() => handleDestination("FaceBook")}
            >
              <Image src={facebook} alt="Youtube" width={25} height={25} />
              Facebook
            </li>
            <li
              className="flex items-center gap-3 py-2 hover:bg-slate-100"
              onClick={() => handleDestination("Instagram")}
            >
              <Image src={instagram} alt="Youtube" width={25} height={25} />
              Instagram
            </li>
            <li
              className="flex items-center gap-3 py-2 hover:bg-slate-100"
              onClick={() => handleDestination("Twitch")}
            >
              <Image src={twitch} alt="Youtube" width={25} height={25} />
              Twitch
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LiveModalContent;
