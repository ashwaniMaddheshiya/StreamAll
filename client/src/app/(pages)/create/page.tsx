"use client";

import Image, { StaticImageData } from "next/image";
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
import styles from "@/components/Brands/Brands.module.css";
import streamLogo from "/public/icons/streamLogo.svg";
import { usePlatform } from "@/context/platforms";
import { myFetch } from "@/utils/myFetch";
import { baseUrl } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const [videoEnable, setVideoEnable] = useState<boolean>(false);
  const [audioEnable, setAudioEnable] = useState<boolean>(false);
  const [selectedPalette, setSelectedPalette] = useState<string>("comments");
  const [bannerText, setBannerText] = useState<string>("");
  const [hasVideo, setHasVideo] = useState<boolean>(false);
  const [mediaAccessible, setMediaAccessible] = useState<boolean>(true);
  const [videoBackground, setVideoBackground] =
    useState<StaticImageData | null>(null);
  const [bannerTheme, setBannerTheme] = useState<string>("block");
  const [logo, setLogo] = useState<StaticImageData | null>(null);
  const router = useRouter()
  const searchParam = useSearchParams();
  const title = searchParam.get("title");
  const { platformList } = usePlatform();
  const videoRef = useRef<HTMLVideoElement>(null);

  if(!title){
    router.push('/');
  }

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log(videoRef);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasVideo(true);
          console.log(videoRef.current.srcObject);
        }
        console.log(stream);
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setHasVideo(false);
        setMediaAccessible(false);
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = (
        videoRef.current.srcObject as MediaStream
      ).getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnable(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTrack = (
        videoRef.current.srcObject as MediaStream
      ).getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnable(audioTrack.enabled);
      }
    }
  };

  const goLiveHandler = async () => {
    console.log(platformList);
    const dto = {
      accessToken: platformList[0].accessToken,
      refreshToken: platformList[0].refreshToken,
      title: "Title",
      description: "Description",
      platformId: platformList[0]._id,
    };

    const youtubeRes = await fetch(`${baseUrl}/api/youtube/live`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    const data = await youtubeRes.json();

    // if(data){
    console.log(data);
    // }
  };

  return (
    <div className="flex w-full h-[88vh]">
      <div className="p-8 w-[60vw]">
        <div>
          <div className="w-full flex items-center justify-center ">
            <div className="w-[70%] h-[400px] rounded-lg relative border-2 border-dashed border-gray-300">
              {logo && (
                <div className="absolute inline-block right-2">
                  <Image src={logo.src} alt="streamlogo" />
                </div>
              )}
              {/* {mediaAccessible && ( */}
              <div
                className="inline-block absolute p-1 bg-[#6750a4] text-white m-1 rounded-md cursor-pointer z-10"
                onClick={goLiveHandler}
              >
                Go Live
              </div>
              {/* )} */}
              {mediaAccessible ? (
                <video ref={videoRef} autoPlay muted></video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 p-3">
                  Camera and/or microphone access is blocked. Please allow
                  access to use this feature.
                </div>
              )}
              {bannerText && (
                <div className="absolute bottom-0 w-[95%] pl-2 mb-3 ">
                  <div className={`${styles[bannerTheme]}`}>{bannerText}</div>
                </div>
              )}
            </div>
          </div>
          {mediaAccessible && (
            <div className="flex gap-4 my-4 justify-center">
              <span
                className="border rounded-full p-2 cursor-pointer"
                onClick={toggleVideo}
              >
                {videoEnable ? (
                  <Image src={videoIcon} alt="video" width={30} height={30} />
                ) : (
                  <Image
                    src={videoOffIcon}
                    alt="video"
                    width={30}
                    height={30}
                  />
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
          )}
        </div>
      </div>
      <div className="border p-4 w-[35vw]">
        {selectedPalette === "comments" && <Comments />}
        {selectedPalette === "banners" && (
          <Banners setBannerText={setBannerText} />
        )}
        {selectedPalette === "brands" && (
          <Brands
            setBackground={setVideoBackground}
            setBannerTheme={setBannerTheme}
            setLogo={setLogo}
          />
        )}
      </div>

      <div className="border-l border-[#ddd] w-[5vw]">
        <div
          className={`flex flex-col items-center justify-center px-2 py-4 cursor-pointer ${
            selectedPalette === "comments" ? "bg-slate-200" : ""
          }`}
          onClick={() => setSelectedPalette("comments")}
        >
          <Image src={commentIcon} alt="comment" width={20} height={20} />
          <span className="text-xs">Comments</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center px-2 py-4 cursor-pointer ${
            selectedPalette === "banners" ? "bg-slate-200" : ""
          }`}
          onClick={() => setSelectedPalette("banners")}
        >
          <Image src={bannerIcon} alt="banner" width={25} height={25} />
          <span className="text-xs">Banners</span>
        </div>
        <div
          className={`flex flex-col items-center justify-center px-2 py-4 cursor-pointer ${
            selectedPalette === "brands" ? "bg-slate-200" : ""
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
