import React from "react";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaFire } from "react-icons/fa6";
import { MdLibraryMusic } from "react-icons/md";
import { MdOutlineLocalMovies } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { LuNewspaper } from "react-icons/lu";
import { SlTrophy } from "react-icons/sl";
import { MdHistory } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";

const Sidebar = () => {
  const mainLinks = [
    {
      icon: <FaHome className="text-xl text-white" />,
      name: "Home",
    },
    {
      icon: <SiYoutubeshorts className="text-xl text-white" />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions className="text-xl text-white" />,
      name: "Subscription",
    },
  ];

  const otherLinks = [
    {
      icon: <FaFire className="text-xl text-white" />,
      name: "Trending",
    },
    {
      icon: <MdLibraryMusic className="text-xl text-white" />,
      name: "Music",
    },
    {
      icon: <MdOutlineLocalMovies className="text-xl text-white" />,
      name: "Movies",
    },
    {
      icon: <SiYoutubegaming className="text-xl text-white" />,
      name: "Gaming",
    },
    {
      icon: <LuNewspaper className="text-xl text-white" />,
      name: "News",
    },
    {
      icon: <SlTrophy className="text-xl text-white" />,
      name: "Sports",
    },
    {
      icon: <MdHistory className="text-xl text-white" />,
      name: "History",
    },
    {
      icon: <RiPlayListAddFill className="text-xl text-white" />,
      name: "PlayList",
    },
    {
      icon: <MdOutlineWatchLater className="text-xl text-white" />,
      name: "Watch Later",
    },
  ];

  return (
    <div className="w-2/12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-5 h-screen overflow-auto">
      {/* Main Links */}
      <ul className="flex flex-col border-b-2 border-gray-600">
        {mainLinks.map(({ icon, name }) => {
          return (
            <li
              key={name}
              className={`pl-6 py-3 rounded-md hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 ease-in-out ${
                name === "Home" ? "bg-indigo-700" : ""
              }`}
            >
              <a href="#" className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider text-white">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Other Links */}
      <ul className="flex flex-col mt-4 border-b-1 border-gray-600">
        {otherLinks.map(({ icon, name }) => {
          return (
            <li
              key={name}
              className="pl-6 py-3 rounded-md hover:bg-gradient-to-r hover:from-green-500 hover:via-teal-500 hover:to-blue-500 hover:text-white transition-all duration-300 ease-in-out"
            >
              <a href="#" className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider text-white">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
