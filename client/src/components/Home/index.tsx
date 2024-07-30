"use client";

import Image from "next/image";
import videoIcon from "/public/icons/videoLive.svg";
import recordingIcon from "/public/icons/recording.svg";
import addIcon from "/public/icons/add.svg";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import LiveModalContent from "../LiveModalContent";
import { myFetch } from "@/utils/myFetch";
import { baseUrl } from "@/constants";
import { usePlatform } from "@/context/platforms";

const Home = () => {
  const [isLiveModal, setIsLiveModal] = useState(false);
  const [isRecordingModal, setIsRecordingModal] = useState(false);
  const {platformList} = usePlatform();

  return (
    <div className="container mx-auto">
      <div className="text-2xl font-medium pt-4 pb-4">Create</div>
      <div className="flex gap-6 items-center flex-wrap">
        <div
          className="group border-[1px solid #ddd]  rounded-md border-[1px] p-4 flex justify-between w-[40%] cursor-pointer hover:text-[#6750a4] transition-colors duration-300"
          onClick={() => setIsLiveModal(true)}
        >
          <div className="flex items-center gap-4">
            <span className="p-4">
              <Image src={videoIcon} alt="live" width={50} height={50} />
            </span>
            <span className="text-xl">Live Stream</span>
          </div>
          <Image
            src={addIcon}
            alt="Add"
            width={30}
            height={30}
            className="hidden group-hover:block transition duration-400"
          />
        </div>

        <div
          className="group border-[1px solid #ddd] rounded-md border-[1px] p-4 flex justify-between w-[40%] cursor-pointer  hover:text-[#6750a4] transition-colors duration-300"
          onClick={() => setIsRecordingModal(true)}
        >
          <div className="flex items-center gap-4">
            <span className="p-4">
              <Image src={recordingIcon} alt="live" width={50} height={50} />
            </span>
            <span className="text-xl">Recording</span>
          </div>
          <Image
            src={addIcon}
            alt="Add"
            width={30}
            height={30}
            className="hidden group-hover:block transition duration-400"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-4 flex-col">
        <div className="text-2xl my-4">Destination</div>

        <div>
          {platformList.length > 0 &&
            platformList.map((platform: any) => (
              <div
                key={platform._id}
                className="bg-[#6750a4] p-2 rounded-md text-white inline-block cursor-pointer"

              >
                {platform.platform}
              </div>
            ))}
        </div>

        <div className="bg-[#6750a4] p-2 rounded-md text-white  cursor-pointer w-[200px] text-center">
          Add Destination
        </div>
      </div>
      {isLiveModal && (
        <Modal isOpen={isLiveModal} onClose={() => setIsLiveModal(false)}>
          <LiveModalContent />
        </Modal>
      )}

      {isRecordingModal && (
        <Modal
          isOpen={isRecordingModal}
          onClose={() => setIsRecordingModal(false)}
        >
          This is for recording mmodal
        </Modal>
      )}
    </div>
  );
};

export default Home;
