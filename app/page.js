"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight);
  },[])

  return (
    <>
      <div className="flex">
        <div className="sidebar-settings bg-[#0a192f] h-screen fixed w-16 z-10 flex flex-col items-center py-10 gap-y-12">
          <i className="fa-solid fa-comment-dots text-2xl  text-gray-50"></i>
          <i className="fa-solid fa-user text-2xl text-gray-500"></i>
          <i className="fa-solid fa-gear text-2xl text-gray-500"></i>
          <i className="fa-solid fa-right-from-bracket text-2xl text-gray-500 mt-auto"></i>
        </div>

        <div className="ps-16 w-full">
          <div className="bg-[#3f5370] h-screen w-80 fixed left-16 py-10 px-4 text-white overflow-y-auto rooms">
            <input type="search" placeholder="Search Room" className="bg-[#283e5e] rounded-3xl w-full px-6 py-1 text-white placeholder-white placeholder:font-light"/>
            <div className="py-8 ps-4 pe-2">
              <ul className="flex flex-col gap-y-6">
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
                <li className="relative">
                  <h4 className="font-bold">Room ABC 1</h4>
                  <p className="text-gray-300">Room 1 description anything</p>
                  <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">2</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#eeeeee] min-h-screen relative px-8 pb-8 ml-80">
            <div>
              <div className="flex items-center gap-x-8 pt-8 fixed bg-[#eeeeee] w-full ">
                <Image alt="" className="bg-black w-[45px] h-[45px] rounded-full p-2"/>
                <div>
                  <h4 className="text-xl font-bold text-[#0a192f]">Room ABC 1</h4>
                  <p className="text-gray-900">Room 1 description anything</p>
                </div>
              </div>
              <div className="flex flex-col gap-y-3 px-4 py-20">
                <p className="recieved"><span>user 1 Message</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>user 1 Message</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
                <p className="sent "><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
                <p className="recieved"><span>i dont know</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="sent"><span>you dont know too</span></p>
                <p className="recieved"><span>you dont know too i think you would know what you think dont tell me you think too about it now stop talking okay ended.</span></p>
              </div>
            </div>
            <form style={{width: "calc(100vw - 128px - 320px)"}} className=" fixed bottom-0 bg-[#eeeeee] pb-8 pt-4">
              <input type="text" placeholder="Message" className="w-full border-1 border-gray-600 px-8 py-2 rounded-3xl"></input>
              <button><i className="fa-solid fa-paper-plane text-xl text-[#112d4e] absolute right-0 transform -translate-y-4 -translate-x-6"></i></button>
            </form>
          </div>
        </div>
      </div>
    </>         
  );
}
