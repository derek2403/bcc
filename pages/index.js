import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import Background from "../components/Background";
import AchievementsPopup from "../components/AchievementsPopup";
import OurFocusPopup from "../components/OurFocusPopup";
import Colab from "../components/Colab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [isLeftImageHovered, setIsLeftImageHovered] = useState(false);
  const [isTopRightImageHovered, setIsTopRightImageHovered] = useState(false);
  const [isBottomRightImageHovered, setIsBottomRightImageHovered] = useState(false);
  const [isAchievementsPopupOpen, setIsAchievementsPopupOpen] = useState(false);
  const [isOurFocusPopupOpen, setIsOurFocusPopupOpen] = useState(false);
  const [isColabPopupOpen, setIsColabPopupOpen] = useState(false);
  return (
    <>
      <Background />
      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-transparent relative z-10 flex items-center justify-center p-[5%]`}
      >
        {/* Container with 90% width and height */}
        <div className="w-[90vw] h-[75vh] flex gap-4">
          {/* Left side - 35% width vertical button */}
          <div className="w-[35%]">
            <div 
              className="h-[100%] w-full bg-gray-200 border-2 border-black cursor-pointer transition-all duration-300 "
              onMouseEnter={() => setIsLeftImageHovered(true)}
              onMouseLeave={() => setIsLeftImageHovered(false)}
              onClick={() => setIsAchievementsPopupOpen(true)}
            >
              <Image
                src={isLeftImageHovered ? "/img1h.png" : "/img1.png"}
                alt="Main image"
                width={1200}
                height={1600}
                className="w-full h-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Right side - 65% width, three horizontal buttons stacked */}
          <div className="w-[65%] flex flex-col gap-4">
            {/* Image 1 */}
            <div 
              className="h-[calc(33.33%-10.67px)] w-full bg-gray-200 border-2 border-black cursor-pointer transition-all duration-300"
              onMouseEnter={() => setIsTopRightImageHovered(true)}
              onMouseLeave={() => setIsTopRightImageHovered(false)}
              onClick={() => setIsOurFocusPopupOpen(true)}
            >
              <Image
                src={isTopRightImageHovered ? "/img2h.png" : "/img2.png"}
                alt="Image 1"
                width={1800}
                height={600}
                className="w-full h-full  object-top transition-all duration-300"
              />
            </div>

            {/* Image 2 */}
            <div className="h-[calc(33.33%-10.67px)] w-full bg-gray-200 border-2 border-black">
              <Image
                src="/img3.png"
                alt="Image 2"
                width={1800}
                height={600}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Image 3 */}
            <div 
              className="h-[calc(33.33%-10.67px)] w-full bg-gray-200 border-2 border-black cursor-pointer transition-all "
              onMouseEnter={() => setIsBottomRightImageHovered(true)}
              onMouseLeave={() => setIsBottomRightImageHovered(false)}
              onClick={() => setIsColabPopupOpen(true)}
            >
              <Image
                src={isBottomRightImageHovered ? "/img4h.png" : "/img4.png"}
                alt="Image 3"
                width={1800}
                height={600}
                className="w-full h-full object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Popup */}
      <AchievementsPopup 
        isOpen={isAchievementsPopupOpen} 
        onClose={() => setIsAchievementsPopupOpen(false)} 
      />

      {/* Our Focus Popup */}
      <OurFocusPopup 
        isOpen={isOurFocusPopupOpen} 
        onClose={() => setIsOurFocusPopupOpen(false)} 
      />

      {/* Colab Popup */}
      <Colab 
        isOpen={isColabPopupOpen} 
        onClose={() => setIsColabPopupOpen(false)} 
      />
    </>
  );
}
