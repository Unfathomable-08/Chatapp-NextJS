"use client"

import Modal from "@/components/Modal";
import { useUserContext } from "@/Context";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import SearchModal from "@/components/RoomModel";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [focusedRoom, setFocusedRoom] = useState();
  const [search, setSearch] = useState("");
  const [searchModal, setSearchModal] = useState(false);
  const [message, setMessage] = useState("");
  const [allMsgs, setAllMsgs] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const searchRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    // Protect Route
    const fetchFn = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const res = await axios.get("/api", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) {
          router.push("/login");
        }

        console.log(res.data)
        setUserData({
          name: res.data.user.first_name + res.data.user.last_name,
          email: res.data.user.email,
          username: res.data.user.username
        });

      } catch (error) {
        console.log(error);
        router.push("/login");

      }
    };
    fetchFn();

  }, []);
  
  // Bottom Of Chat
  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight);
  },[allMsgs])

  // Fetching Rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (userData.username) { 
          const res = await axios.get(`/api/rooms?username=${userData.username}`);
          setRooms(res.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch rooms", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchRooms();
  }, [userData, showModal, searchModal]);

  // Fetching Messages
  useEffect(()=>{
    if(!focusedRoom?.name) return;

    const q = query(
      collection(db, `rooms/${focusedRoom.name}/messages`), 
      orderBy("timestamp", "asc")
    );    

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllMsgs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  
    return () => unsubscribe();

  },[focusedRoom])


  const logout = () => {
    localStorage.removeItem("token");
    router.push('/login');
  }

  const createRoom = () => {
    window.scrollTo(0, document.body.scrollHeight);
    setShowModal(prev => !prev);
  }

  const searchRoom = () => {
    try {
      const fetchFn = async () => {
        const res = await axios.get(`api/search?search=${search}`);
        if (res.status === 200) {
          console.log(res);
          setSearchModal(true);
        }
      }
      fetchFn();

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const sentMessage = async (e) => {
    e.preventDefault(); 

    if (!message.trim() || !focusedRoom) return;
    console.log(focusedRoom.name)
    try {
      const docRef = await addDoc(collection(db, `rooms/${focusedRoom.name}/messages`), {
        user: userData.username,
        message,
        timestamp: serverTimestamp(),
      });
      console.log(docRef)

      setMessage("");
      messageRef.current.value = "";

    } catch (error) {
      console.log(error);

      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  return (
    <>
      <div className="flex">
        <div className="sidebar-settings bg-[#0e0f11] h-screen fixed w-16 z-10 flex flex-col items-center py-10 gap-y-12 max-md:hidden">
          <i className="fa-solid fa-comment-dots text-2xl  text-gray-50" onClick={()=>{setSidebar(prev => !prev)}}></i>
          <i className="fa-solid fa-user text-2xl text-gray-500"></i>
          <i className="fa-solid fa-gear text-2xl text-gray-500"></i>
          <i onClick={logout} className="fa-solid fa-right-from-bracket text-2xl text-gray-500 mt-auto"></i>
        </div>
  
        <div className="md:ps-16 w-full">
          <div className={`bg-[#3f5370] h-screen w-60 lg:w-80 fixed md:left-16 py-10 px-4 text-white overflow-y-auto rooms ${sidebar ? "" : "hidden sm:block"}`}>
            <div className="grid grid-cols-[9fr_1fr] justify-center items-center gap-x-4 gap-y-1">
              <input type="search" placeholder="Search Room ..." ref={searchRef} onChange={(e)=>setSearch(e.target.value)} className="bg-[#eee] rounded-3xl w-full px-6 py-[3px] focus:outline-none focus:border-black focus:border-1 text-black placeholder-black placeholder:font-dark border-1 border-white" />
              <button onClick={searchRoom} className="text-4xl font-light transform -translate-[5px] cursor-pointer">+</button>
              <button onClick={createRoom} className="bg-[#1d2d49] cursor-pointer rounded-3xl py-1 col-span-2">Create Room</button>
            </div>
            <div className="py-8 ps-4 pe-2">
              <ul className="flex flex-col gap-y-6">
                {rooms.map((room, index) => (
                  <li onClick={() => setFocusedRoom(room)} key={index} className="relative cursor-pointer">
                    <h4 className="font-bold">{room.name}</h4>
                    <p className="text-gray-300">{room.description}</p>
                    <span className="absolute right-0 top-3 bg-[#112d4e] py-1 px-2.5 rounded-full text-sm">1</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          {/* Conditional Rendering of Chat Panel */}
          {focusedRoom ? (
            <div className="bg-[#eeeeee] min-h-screen relative px-8 pb-8 sm:ml-60 lg:ml-80">
              <div>
                <div className="flex items-center gap-x-6 pt-6 fixed bg-[#eeeeee] w-full">
                  <div className="bg-black w-[45px] h-[45px] rounded-full p-2">
                    <div width={45} height={45} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#0a192f]">{focusedRoom.name}</h4>
                    <p className="text-gray-900">{focusedRoom.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 px-4 py-22">
                  {
                    allMsgs.map((msg, index)=>
                      <p key={index} className={msg.user === userData.username ? "sent" : "recieved"}><span>{ msg.message }</span></p>
                    )
                  }
                </div>
              </div>
              <form className="message fixed bottom-0 bg-[#eeeeee] pb-8 pt-4" onSubmit={(e) => {sentMessage(e)}}
            >
                <input ref={messageRef} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder="Message" className="w-full border border-gray-600 px-8 py-2 rounded-3xl" />
                <button type="submit">
                  <i className="fa-solid fa-paper-plane text-xl text-[#112d4e] absolute right-0 transform -translate-y-4 -translate-x-6"></i>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-[#eeeeee] min-h-screen flex flex-col px-8 pb-8 lg:ml-80 sm:ml-60 justify-center items-center text-center">
              <h2 className="text-2xl font-semibold text-gray-700">No Room Selected</h2>
              <p className="text-gray-600 mt-2">
                Use the search bar to find a room then click the <span className="text-xl">+</span> button or just create a new one.
              </p>
            </div>
          )}
        </div>
      </div>
  
      {/* Modal Component */}
      {showModal && <Modal onClose={createRoom} />}
      {searchModal && <SearchModal onClose={setSearchModal} room={search} />}

      {/* Arrow for mobile */}
      <div className="md:hidden fixed z-30 left-0 cursor-pointer top-1/2 transform -translate-y-1/2 text-2xl">
        <i className={`fa-solid ${sidebar ? "fa-chevron-left" : "fa-chevron-right"} text-gray-900 ps-2`} onClick={()=>{setSidebar(prev => !prev)}}></i>
      </div>
    </>
  );  
}