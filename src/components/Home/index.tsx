"use client";

import Image from "next/image";
import videoIcon from "/public/icons/videoLive.svg";
import recordingIcon from "/public/icons/recording.svg";
import addIcon from "/public/icons/add.svg";
import { useState } from "react";
import Modal from "../UI/Modal";
import LiveModalContent from "../LiveModalContent";

const Home = () => {
  const [isLiveModal, setIsLiveModal] = useState(false);
  const [isRecordingModal, setIsRecordingModal] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="text-2xl font-medium pt-4 pb-4">Create</div>
      <div className="flex gap-6 items-center flex-wrap">
        <div
          className="group border-[1px solid #ddd]  rounded-md border-[1px] p-4 flex justify-between w-[40%] cursor-pointer hover:text-blue-700 transition-colors duration-300"
          onClick={() => setIsLiveModal(true)}
        >
          <div className="flex items-center gap-4">
            <span className="p-4 bg-teal-100">
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
          className="group border-[1px solid #ddd] rounded-md border-[1px] p-4 flex justify-between w-[40%] cursor-pointer  hover:text-blue-700 transition-colors duration-300"
          onClick={() => setIsRecordingModal(true)}
        >
          <div className="flex items-center gap-4">
            <span className="p-4 bg-teal-100">
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
