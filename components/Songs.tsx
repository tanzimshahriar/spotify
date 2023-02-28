import { ClockIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue(playlistState);
    return (
        <div className="p-3 md:p-8 text-white font-light">
            <div className="grid grid-cols-11 text-gray-400 py-2 items-center text-xs xl:text-sm">
            <div className="px-2 md:px-3 xl:pr-4 col-span-9 md:col-span-6 lg:col-span-5 flex">
                <div className="pr-2 md:pr-4">#</div>
                <div>
                    TITLE
                </div>
            </div>

            <div className="px-2 md:px-3 xl:pr-4 xl:px-4 hidden md:block col-span-2 lg:col-span-3">
                <p>ALBUM</p>
            </div>
            <div className="px-2 md:px-3 xl:pr-4 xl:px-4 hidden lg:block col-span-2">
                <p>DATE ADDED</p>
            </div>
            <div className="px-2 md:px-3 xl:pr-4 xl:px-4 col-span-2 md:col-span-3 lg:col-span-1 justify-self-end">
                <ClockIcon className="w-5 h-5" />
            </div>
            
            
            
        </div>
        <hr className="border-gray-800 pb-2 md:pb-3"/>
            {playlist?.tracks.items.map((track, i) => (
                <Song key={track. track.id} track={track} order={i + 1} />
            ))}
        </div>
    )
}

export default Songs
