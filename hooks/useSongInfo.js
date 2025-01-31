import useSpotify from "../hooks/useSpotify"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [songInfo, setsongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());

                setsongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    }, [currentIdTrack, spotifyApi])

    return songInfo;
}

export default useSongInfo;