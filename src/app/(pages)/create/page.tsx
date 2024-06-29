"use client";

import Image from "next/image";
import videoIcon from "/public/icons/video.svg";
import videoOffIcon from "/public/icons/video_slash.svg";
import micIcon from "/public/icons/mic.svg";
import micOffIcon from "/public/icons/mic_slash.svg";
import commentIcon from "/public/icons/comment.svg";
import brandIcon from "/public/icons/brand.svg";
import bannerIcon from "/public/icons/banner.svg";
import { useEffect, useRef, useState } from "react";
import Comments from "@/components/Comments";
import Banners from "@/components/Banners";
import Brands from "@/components/Brands";

const Page = () => {
  const [videoEnable, setVideoEnable] = useState(false);
  const [audioEnable, setAudioEnable] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState("comments");
  const [bannerText, setBannerText] = useState("");
  const [hasVideo, setHasVideo] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasVideo(true);
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setHasVideo(false);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnable(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnable(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="flex w-full min-h-[89vh] ">
      <div className="p-8 w-[60vw]">
        <div>
          <div className="w-full flex items-center justify-center ">
            {hasVideo ? (
              <div className="w-[70%] h-[400px] rounded-lg relative">
                <video ref={videoRef} autoPlay muted></video>
                {bannerText && (
                  <div className="absolute bottom-0 w-[95%] bg-purple-600 text-white font-medium py-2 text-xs pl-2 mb-4 ">
                    {bannerText}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-[70%] h-[400px] flex items-center justify-center rounded-lg bg-gray-200">
                Camera not accessible
              </div>
            )}
          </div>
          <div className="flex gap-4 my-4 justify-center">
            <span
              className="border rounded-full p-2 cursor-pointer"
              onClick={toggleVideo}
            >
              {videoEnable ? (
                <Image src={videoIcon} alt="video" width={30} height={30} />
              ) : (
                <Image src={videoOffIcon} alt="video" width={30} height={30} />
              )}
            </span>
            <span
              className="border rounded-full p-2 cursor-pointer"
              onClick={toggleAudio}
            >
              {audioEnable ? (
                <Image src={micIcon} alt="audio" width={30} height={30} />
              ) : (
                <Image src={micOffIcon} alt="audio" width={30} height={30} />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="border p-4 w-[35vw]">
        {selectedPalette === "comments" && <Comments />}
        {selectedPalette === "banners" && (
          <Banners setBannerText={setBannerText} />
        )}
        {selectedPalette === "brands" && <Brands />}
      </div>
      <div className="bg-purple-600 w-[5vw]">
        <div
          className={`flex flex-col items-center justify-center px-2 py-4 cursor-pointer ${
            selectedPalette === "comments" ? "bg-blue-400" : ""
          }`}
          onClick={() => setSelectedPalette("comments")}
        >
          <Image src={commentIcon} alt="comment" width={20} height={20} />
          <span className="text-xs">Comments</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center px-2 py-4 cursor-pointer ${
            selectedPalette === "banners" ? "bg-blue-400" : ""
          }`}
          onClick={() => setSelectedPalette("banners")}
        >
          <Image src={bannerIcon} alt="banner" width={25} height={25} />
          <span className="text-xs">Banners</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center px-2 py-4 cursor-pointer ${
            selectedPalette === "brands" ? "bg-blue-400" : ""
          }`}
          onClick={() => setSelectedPalette("brands")}
        >
          <Image src={brandIcon} alt="brand" width={25} height={25} />
          <span className="text-xs">Brands</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
