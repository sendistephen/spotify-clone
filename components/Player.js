import useSpotify from "../hooks/useSpotify";

import React from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song.atom";
import { useEffect, useState } from "react/cjs/react.production.min";
import useSongInfo from "../hooks/useSongInfo";
import {
	HeartIcon,
	VolumeUpIcon as volumeDownIcon,
	SwitchHorizontalIcon,
	PauseIcon,
	PlayIcon,
	FastForwardIcon,
	ReplyIcon,
} from "@heroicons/react/outline";
import { RewindIcon } from "@heroicons/react/solid";

function Player() {
	const [currentTrackId, setCurrentTrackId] =
		useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

	const spotify = useSpotify();

	const { data: session } = useSession();

	const [volume, setVolume] = useState(50);

	const songoInfo = useSongInfo();

	const fetchCurrentSong = () => {
		if (!songoInfo) {
			spotify.getMyCurrentPlayingTrack().then((data) => {
				setCurrentTrackId(data?.body?.item?.id);

				spotify.getMyCurrentPlaybackState().then((data) => {
					setIsPlaying(data?.body?.is_playing);
				});
			});
		}
	};

	useEffect(() => {
		if (spotify.getAccessToken() && !currentTrackId) {
			// fetch the song info
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentTrackId, spotify, session]);

	return (
		<div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white">
			{/* left */}
			<div className="flex items-center space-x-4">
				<img
					className="hidden md:inline h-10 w-10"
					src={songoInfo?.album?.images?.[0]?.url}
					alt=""
				/>
				<div>
					<h3>{songoInfo?.name}</h3>
					<p>{songoInfo?.artists?.[0]?.name}</p>
				</div>
			</div>
			{/* center */}
			<div className="flex items-center justify-evenly">
				<SwitchHorizontalIcon className="button" />
				<RewindIcon
					onClick={() => spotify.skipToPrevious()}
					className="button"
				/>
				{isPlaying ? (
					<PauseIcon className="button h-10 w-10" />
				) : (
					<PlayIcon className="button h-10 w-10" />
				)}
				<FastForwardIcon
					onClick={() => spotify.skipToNext()}
					className="button"
				/>
				<ReplyIcon className="button" />
			</div>
		</div>
	);
}

export default Player;
