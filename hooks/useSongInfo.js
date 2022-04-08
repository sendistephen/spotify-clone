import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";

import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song.atom";

function useSongInfo() {
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const spotify = useSpotify();
	const [songInfo, setSongInfo] = useState(null);

	// when it mounts, get the current track info
	useEffect(() => {
		const fetchSongInfo = async () => {
			// if there is a current track that is selected
			if (currentTrackId) {
				const trackInfo = await fetch(
					`https://api.spotify.com/v1/tracks/${currentTrackId}`,
					{
						headers: {
							Authorization: `Bearer ${spotify.getAccessToken()}`,
						},
					}
				).then((res) => res.json());
				setSongInfo(trackInfo);
			}
		};
		fetchSongInfo();
	}, [currentTrackId, spotify]);

	return songInfo;
}

export default useSongInfo;
