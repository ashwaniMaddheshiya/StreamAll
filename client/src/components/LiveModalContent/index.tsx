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
  const { data: session, status } = useSession();

  const handleDestination = async (destination: string) => {
    // if (!destList.includes(destination)) {
    //   setDestList([...destList, destination]);
    // }
    // setShowDestList(false);

    const dto = {
      platform: "YouTube",
      userId: "668da076d3522ae79f5b31bb",
    };

    const { error, data } = await myFetch(`${baseUrl}/api/platform/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (data) {
      if (data.function === "signIn") {
        signIn("google");
      } else {
        setPlatformData(data);
      }
    }

    if (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    console.log(session)
    if (status === "authenticated") {
      
      console.log("User is signed in:", session);
    } else if (status === "unauthenticated") {
      console.log("User is not signed in.");
    }
  }, [status, session]);

  return (
    <div className="w-[40vw]">
      <div className="text-2xl font-medium">Create Live Stream</div>
      <div className="mt-4 ">
        <div className="text-lg text-gray-600 mb-4">Select Destinations</div>
        <div className="flex gap-2 flex-wrap">
          {destList.map((dest, index) => (
            <div
              className="relative flex w-fit border-[1px] border-blue-600 p-2 rounded-3xl text-blue-600 cursor-pointer hover:text-blue-700 hover:border-blue-700"
              key={index}
            >
              <Image src={imageMap[dest]} alt={dest} width={20} height={20} />
              {dest}
            </div>
          ))}
          <div
            className="relative flex w-fit border-[1px] border-blue-600 p-2 rounded-3xl text-blue-600 cursor-pointer hover:text-blue-700 hover:border-blue-700"
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
          />
          <div className="text-white bg-blue-600 hover:bg-blue-800 p-3 my-8 text-center rounded-lg cursor-pointer">
            Create Live Stream
          </div>
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
