import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userDefaultImage from "../assets/images/user.png";
import { playlistState, playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { signOut } from "next-auth/react";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-rose-500",
    "from-amber-500",
    "from-fuchsia-500",
    "from-indigo-500",
    "from-sky-500",
    "from-emerald-500",
    "from-teal-500",
    "from-cyan-500",
    "from-sky-500"
]

function Center() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [color, setColor] = useState<String | null>(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState<any>(playlistState);

    useEffect(() => {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data: { body: any }) => {
            setPlaylist(data.body);
        }).catch((error: any) => console.log("Something went wrong!", error));
    }, [spotifyApi, playlistId]);

 
    return (
        <div className="text-white flex-grow h-screen overflow-y-scroll scrollbar-hide pb-24">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black rounded-full p-1 cursor-pointer" onClick={() => signOut()}>
                    <img
                        className="rounded-full w-[30px] h-[30px]"
                        src={session?.user.image || userDefaultImage}
                        alt="Profile Picture"
                    />
                    <h2 className="px-2 text-sm">{session?.user.name}</h2>
                    <ChevronDownIcon className="mr-2 h-4 w-4" />
                </div>
            </header>
            <section className={`flex text items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-3 md:p-8`}>
                <img className="w-44 h-44 shadow-2xl" src={playlist?.images[0]?.url} alt={playlist?.name} />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{playlist?.name}</h1>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>

    )
}

export default Center
