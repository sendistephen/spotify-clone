import useSpotify from "../hooks/useSpotify";

import React, { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song.atom";
import { useEffect, useState } from "react/cjs/react.production.min";
import useSongInfo from "../hooks/useSongInfo";
import {
	VolumeUpIcon as VolumeDownIcon,
	SwitchHorizontalIcon,
	PauseIcon,
	PlayIcon,
	FastForwardIcon,
	ReplyIcon,
	VolumeUpIcon,
} from "@heroicons/react/outline";
import { RewindIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";

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
	const handlePlayPause = () => {
		spotify.getMyCurrentPlaybackState().then((data) => {
			if (data?.body?.is_playing) {
				spotify.pause();
				setIsPlaying(false);
			} else {
				spotify.play();
				setIsPlaying(true);
			}
		});
	};

	useEffect(() => {
		if (spotify.getAccessToken() && !currentTrackId) {
			// fetch the song info
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentTrackId, spotify, session]);

	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			spotify.setVolume(volume).catch((e) => {});
		}, 500)[volume]
	);

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
	}, [volume]);
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
					<PauseIcon
						onClick={handlePlayPause}
						className="button h-10 w-10 fill-white"
					/>
				) : (
					<PlayIcon
						onClick={handlePlayPause}
						className="button h-10 w-10 fill-white"
					/>
				)}
				<FastForwardIcon
					onClick={() => spotify.skipToNext()}
					className="button"
				/>
				<ReplyIcon className="button" />
			</div>
			{/* Right */}
			<div className="flex items-center space-x-3 justify-end pr-5 md:pr-0">
				<VolumeDownIcon
					onClick={() => volume > 0 && setVolume(volume - 10)}
					className="w-5 h-5"
				/>
				<input
					onChange={(e) => setVolume(Number(e.target.value))}
					type="range"
					min={0}
					max={100}
					className="w-16 md:w-28 cursor-pointer bg-green-700"
				/>
				<VolumeUpIcon
					onClick={volume < 100 && setVolume(volume + 10)}
					className="h-5 w-5"
				/>
			</div>
		</div>
	);
}

export default Player;
