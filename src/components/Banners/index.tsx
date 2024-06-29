import { useState } from "react";
import Image from "next/image";
import deleteIcon from "/public/icons/delete.svg";
import editIcon from "/public/icons/edit.svg";

interface BannerProps {
  setBannerText: (a: string) => void;
}

const Banners: React.FC<BannerProps> = ({ setBannerText }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bannerList, setBannerList] = useState([
    "The text is showing for the dummy purpose. We will fetch it from backend",
  ]);
  const [inputText, setInputText] = useState("");

  const handleSubmitBanner = () => {
    setBannerList((prev) => [...prev, inputText]);
    setInputText("");
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {bannerList.map((item, index) => (
        <div
          key={index}
          className="relative text-sm bg-slate-200 p-2 rounded-md cursor-pointer group"
        >
          {item}
          <div className="absolute inset-0 bg-slate-300 bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <span
              className="text-sm font-medium text-gray-700"
              onClick={() => setBannerText(item)}
            >
              Show
            </span>
            <span className="absolute top-1 right-6">
              <Image src={editIcon} alt="edit" width={18} height={18} />
            </span>
            <span className="absolute top-1 right-0">
              <Image src={deleteIcon} alt="delete" width={20} height={20} />
            </span>
          </div>
        </div>
      ))}
      {isFormOpen && (
        <input
          type="text"
          className="border text-sm rounded-md bg-inherit outline-none p-2 w-full "
          placeholder="Enter the Banner..."
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      )}
      {!isFormOpen && (
        <div
          className="text-center p-2 text-gray-500 font-medium text-sm hover:bg-slate-300 hover:border-[1px] border-[#ddd] rounded-md cursor-pointer"
          onClick={() => setIsFormOpen(true)}
        >
          Create a Banner
        </div>
      )}
      {isFormOpen && (
        <div className="flex items-center gap-1">
          <span
            className="flex-1 text-center p-2 text-white font-medium text-sm bg-purple-600 hover:bg-purple-700 border-[1px] border-[#ddd] rounded-md cursor-pointer"
            onClick={handleSubmitBanner}
          >
            Add Banner
          </span>
          <span
            className="flex-1 text-center p-2 text-gray-500 font-medium text-sm hover:bg-slate-300 border-[1px] border-[#ddd] rounded-md cursor-pointer"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </span>
        </div>
      )}
    </div>
  );
};

export default Banners;
