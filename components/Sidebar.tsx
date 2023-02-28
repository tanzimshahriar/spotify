import Image from "next/image";
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from "@heroicons/react/outline";
import Logo from "../assets/images/logo_white.png"
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom"



function Sidebar() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
       if(spotifyApi.getAccessToken()){
           spotifyApi.getUserPlaylists().then((data: { body: { items: SetStateAction<any[]>; }; }) => {
            setPlaylists(data.body.items);
           })
       }
    }, [session, spotifyApi])

    return (
        <div className="pt-2 pb-36 text-gray-400 px-2 text-xs md:text-sm border-r border-gray-900 space-y-4 font-extrabold overflow-y-scroll h-screen md:min-w-[12rem] lg:min-w-[15rem] hidden md:block">
            <div>
                <div className="flex flex-col space-y-4 p-5">
                    <div>
                        <Image src={Logo} alt="spotify-logo" width={136.0512} height={40.8384} /> 
                    </div>
                </div>
                <button className="flex items-center space-x-2 py-2 px-5 hover:text-white rounded-md">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 py-2 px-5 hover:text-white rounded-md">
                    <SearchIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 py-2 px-5 hover:text-white rounded-md">
                    <LibraryIcon className="h-5 w-5"/>
                    <p>Your Library</p>
                </button>
            </div>

            <div>
                <hr className="border-gray-800 mx-5 my-2"/>
                {/* Playlists */}
                <div className="font-light">
                    {playlists.map((playlist) => (
                        <p key={playlist.id} className="cursor-pointer hover:text-white py-2 px-5" onClick={() => setPlaylistId(playlist.id)}>
                            {playlist.name}
                        </p>
                    ))}
                </div>
               

            </div>
            
        </div>
    )
}

export default Sidebar
