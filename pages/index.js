import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Background from "../components/Background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
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
            <div className="h-[109%] w-full bg-gray-200 border-2 border-black">
              <Image
                src="/placeholder-image-1.jpg"
                alt="Main image"
                width={500}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - 65% width, three horizontal buttons stacked */}
          <div className="w-[65%] flex flex-col gap-4">
            {/* Image 1 */}
            <div className="flex-1 w-full bg-gray-200 border-2 border-black">
              <Image
                src="/placeholder-image-2.jpg"
                alt="Image 1"
                width={600}
                height={125}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="flex-1 w-full bg-gray-200 border-2 border-black">
              <Image
                src="/placeholder-image-3.jpg"
                alt="Image 2"
                width={600}
                height={125}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3 */}
            <div className="flex-1 w-full bg-gray-200 border-2 border-black">
              <Image
                src="/placeholder-image-4.jpg"
                alt="Image 3"
                width={600}
                height={125}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
