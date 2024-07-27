import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import bg1 from "/public/images/bg1.jpg";
import bg2 from "/public/images/bg2.jpg";
import bg3 from "/public/images/bg3.jpg";
import bg4 from "/public/images/bg4.jpg";
import bg5 from "/public/images/bg5.jpg";
import streamLogo from "/public/icons/streamLogo.svg";
import addIcon from "/public/icons/addWhite.svg";
import styles from "./Brands.module.css";
import { showToast } from "@/utils/showToast";

const backgrounds = [
  { src: bg1, label: "Background - 1" },
  { src: bg2, label: "Background - 2" },
  { src: bg3, label: "Background - 3" },
  { src: bg4, label: "Background - 4" },
  { src: bg5, label: "Background - 5" },
];

interface BrandProps {
  setBackground: (bg: StaticImageData) => void;
  setBannerTheme: (banner: string) => void;
  setLogo: (logo: File) => void;
}

const Brands: React.FC<BrandProps> = ({
  setBackground,
  setBannerTheme,
  setLogo,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "image/png") {
        showToast("error", "Please upload a PNG file.");
        return;
      }
      setLogo(file);
    }
  };

  return (
    <div className="overflow-y-scroll h-[100%]">
      <div className="mb-6">
        <div className="font-medium text-gray-600 text-xl">Banner Theme</div>
        <div className="flex gap-4 my-2">
          <div
            className="w-[150px] h-[60px] border rounded-md flex items-center cursor-pointer"
            onClick={() => setBannerTheme("rectangle")}
          >
            <div className={styles.rectangle}>Banner Content</div>
          </div>

          <div
            className="w-[150px] h-[60px] border rounded-md flex items-center cursor-pointer"
            onClick={() => setBannerTheme("circular")}
          >
            <div className={styles.circular}>Banner Content</div>
          </div>

          <div
            className="w-[150px] h-[60px] border rounded-md flex items-center cursor-pointer"
            onClick={() => setBannerTheme("block")}
          >
            <div className={styles.block}>Banner Content</div>
          </div>
        </div>
      </div>

      <div className="my-6">
        <div className="font-medium text-gray-600 text-xl">Logos</div>
        <div className="flex gap-4 my-2 cursor-pointer">
          <div className="w-[70px] h-[70px] flex justify-center items-center border border-[#ddd] rounded-md">
            <Image src={streamLogo} alt="streamLogo" width={50} height={50} />
          </div>
          <label className="w-[70px] h-[70px] flex justify-center items-center border border-[#ddd] rounded-md cursor-pointer">
            <Image src={addIcon} alt="addFile" width={40} height={40} />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png"
            />
          </label>
        </div>
      </div>

      <div className="my-6">
        <div className="font-medium text-gray-600 text-xl">Backgrounds</div>
        <div>
          {backgrounds.map((bg, index) => (
            <div
              key={index}
              className="flex items-center gap-3 my-3 cursor-pointer"
              onClick={() => setBackground(bg.src)}
            >
              <Image
                src={bg.src}
                alt={`bg${index + 1}`}
                width={100}
                height={100}
              />
              {bg.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
