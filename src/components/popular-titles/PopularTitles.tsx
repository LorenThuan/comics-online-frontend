import React from "react";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import SidebarIcon from "../icon/SidebarIcon";
import ImgDemo from "../../assets/demo.jpg"

const PopularTitles = () => {
  return (
    <>
      <div className="h-[410px] bg-gray-100 w-fit" >
        <div className="container pb-8 sm:pb-0 mt-12">

        {/*This is img section*/}
          <div className="flex flex-col gap-8">
          <div className="">
            <h1 className="text-2xl font-semibold">Popular New Titles</h1>
            </div>
       

{/*This is titles section*/}
          <div className="flex gap-4">
          <div>
              <img src={ImgDemo} className="w-[200px] h-[284.375px] object-cover" alt="popular titles" />
            </div>

          <div className="grid grid-cols-1 w-full">
            <h1 className="text-2xl font-bold font-sans">Kyou Kara Ore wa Loli no Himo!</h1>
            <p className="font-bold text-sm">SUGGESTIVE LOLI COMEDY HAREM SLICE OF LIFE ADAPTATION</p>
            <p className="text-[describes-rgb]">I, Tendou Haru, who was aiming to become a mangaka, somehow became a winner in life; super-rich bishoujo elementary school student, Nijou Touka, was a big fan of mine and, on top of that, she said that she was going to be my patron. Just like that, my ideal lifestyle of living off of someone had started.</p>

          {/*I want it lie right of image*/}
          <div className="flex items-center justify-between self-end">
          <p className="italic font-bold text-1xl">Akatsuki Yuki Henreader  </p>
          <div className="flex gap-6 items-center">
            <div className="font-bold text-1xl">NO.1</div>
            <SidebarIcon icon={<MdNavigateBefore size="22" />} />
            <SidebarIcon icon={<MdNavigateNext size="22" />} />
          </div>

          </div>
          </div>
          
          

       
        </div>

          </div>
          
         
       
        </div>
  
      </div>
    </>
  );
};

export default PopularTitles;
