import { getSession, GetSessionParams, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify"
import useSongInfo from "../hooks/useSongInfo"
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useState, useEffect, useCallback } from "react";
import { FastForwardIcon, ReplyIcon, SwitchHorizontalIcon, VolumeUpIcon as Down } from "@heroicons/react/outline";
import {PauseIcon, PlayIcon, RewindIcon, VolumeUpIcon as Up} from "@heroicons/react/solid";
import { debounce } from "lodash";

function Player() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data:any) => {
                setCurrentTrackId(data.body?.item?.id);
                spotifyApi.getMyCurrentPlaybackState().then((data:any) => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }
    
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data:any) => {
            console.log(data);
            if(data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    }

    useEffect(() => {
       if(spotifyApi.getAccessToken() && !currentTrackId) {
           fetchCurrentSong();
           setVolume(50);
       }
    }, [currentTrackIdState, session, songInfo])

    useEffect(() => {
        if(volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((e:any) => console.log(e));
        }, 500),
        []
        
    );

    return (
        <div className="text-white font-light h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-sm px-2 md:px-8">
            {/* left */}
            <div className="flex items-center">
                <img
                    className="hidden md:block h-10 w-10 md:h-14 md:w-14"
                    src={songInfo?.album.images?.[0]?.url}
                    alt="song image"
                />
                <div className="px-2">
                    <h3>{songInfo?.name}</h3>
                    <p className="text-gray-400 text-xs">
                        {songInfo?.artists?.[0]?.name}
                    </p>
                </div>
            </div>
            {/* center */}
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-6">
                    <SwitchHorizontalIcon className="button" />
                    <RewindIcon
                        // onClick={spotifyApi.skipToPrevious()}
                        className="button"
                    />
                    {isPlaying ? (
                        <PauseIcon
                            className="button w-10 h-10"
                            onClick={handlePlayPause}
                        />
                    ) : (
                        <PlayIcon
                            className="button w-10 h-10"
                            onClick={handlePlayPause}
                        />
                    )}

                    <FastForwardIcon className="button" />
                    <ReplyIcon className="button" />
                </div>
            </div>
            {/* right */}

            <div className="flex items-center justify-end space-x-3 md:space-x-4 md:pr-5">
                <Down
                    className="button"
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                />
                <input
                    className="w-12 md:w-auto"
                    type="range"
                    min={0}
                    value={volume}
                    max={100}
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
                <Up
                    className="button"
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                />
            </div>
        </div>
    );
}

export default Player;