import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";

type Props = {
    track : any,
    order: Number
}

const Song: React.FC<Props> = ({order, track}) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }

    return (
        <div className="hover:bg-gray-800 cursor-pointer rounded-md grid grid-cols-11 text-gray-400 py-2 items-center text-xs xl:text-sm" onClick={playSong}>
            <div className="px-2 md:px-3 xl:pr-4 flex items-center col-span-9 md:col-span-6 lg:col-span-5">
                <p className="pr-2 md:pr-4">{order}</p>
                <img src={track.track.album.images[0].url} alt="Album Art" className="w-10 h-10" />
                <div className="pl-2 md:pl-4">
                    <p className="text-white text-sm xl:text-lg">{track.track.name}</p>
                    <p >{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="px-2 md:px-3 xl:pr-4 xl:px-4 hidden md:block col-span-2 lg:col-span-3">
                <p>{track.track.album.name}</p>
            </div>
            <div className="px-2 md:px-3 xl:pr-4 xl:px-4 hidden lg:block col-span-2">
                <p>{new Date(track.added_at).toLocaleDateString('en-US', {day:'numeric', month: 'short', year: 'numeric'})}</p>
            </div>
            <div className="px-2 md:px-3 xl:pr-4 xl:px-4 col-span-2 md:col-span-3 lg:col-span-1 justify-self-end">
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
            
            
        </div>
    )
}

export default Song;
