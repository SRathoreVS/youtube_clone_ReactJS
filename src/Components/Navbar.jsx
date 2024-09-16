import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { MdOutlineVideoCall } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/UseApp";
import { clearVideos, clearSearchTerm, changeSearchTerm } from "../Features/youtube/youtubeSlice";
import { getSearchPageVideos } from "../Store/Reducers/getSearchPageVideos";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm) || ""; 

  const handleSearch = () => {
    if (location.pathname !== "/search") {
      navigate("/search");
    } else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 opacity-95 sticky top-0 z-50 px-6 md:px-14 h-14 text-white shadow-lg">
      {/* Left Section: Logo and Menu */}
      <div className="flex gap-6 items-center text-xl">
        <button aria-label="Menu" className="hover:text-gray-400 transition-colors duration-300 ease-in-out">
          <RxHamburgerMenu />
        </button>
        <div className="flex gap-2 items-center">
          <FaYoutube className="text-3xl text-red-600" />
          <span className="text-2xl font-bold">Cuttube</span>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex items-center justify-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex bg-zinc-900 items-center h-10 rounded-3xl overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-64 md:w-96 bg-zinc-900 text-white focus:outline-none border-none px-4 placeholder-gray-400"
              value={searchTerm} // Controlled input
              onChange={(e) => dispatch(changeSearchTerm(e.target.value))} // Update the state on input change
            />
            <button className="h-full w-12 flex items-center justify-center bg-zinc-700 hover:bg-gray-600 transition-colors duration-300 ease-in-out">
              <IoSearchOutline className="text-xl text-white" />
            </button>
          </div>
        </form>

        <button
          aria-label="Microphone"
          className="text-xl p-3 bg-zinc-900 rounded-full hover:bg-gray-800 transition-colors duration-300 ease-in-out"
        >
          <FaMicrophone />
        </button>
      </div>

      {/* Right Section: Icons */}
      <div className="flex gap-5 items-center text-xl">
        <button aria-label="Upload Video" className="hover:text-gray-400 transition-colors duration-300 ease-in-out">
          <MdOutlineVideoCall />
        </button>
        <div className="relative">
          <button aria-label="Notifications" className="hover:text-gray-400 transition-colors duration-300 ease-in-out">
            <FaBell />
            <span className="absolute bottom-2 left-3 text-xs bg-red-500 rounded-full px-1">9+</span>
          </button>
        </div>
        <button aria-label="Profile" className="hover:text-gray-400 transition-colors duration-300 ease-in-out">
          <CgProfile />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
