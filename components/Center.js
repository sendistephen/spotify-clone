import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlist.atom";
import useSpotify from "../hooks/useSpotify";

const colors = [
	"from-blue-500",
	"from-green-500",
	"from-rose-500",
	"from-sky-500",
	"from-pink-500",
];
const Center = () => {
	const [color, setColor] = useState(null);
	const { data: session } = useSession();
	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);
	const spotify = useSpotify();

	useEffect(() => {
		setColor(shuffle(colors).pop()); // randomize colors on page load
	}, [playlistId]);

	// set the playlist state when the component mounts
	useEffect(() => {
		if (spotify.getAccessToken()) {
			spotify
				.getPlaylist(playlistId)
				.then((data) => {
					setPlaylist(data.body);
				})
				.catch((error) => console.log(error));
		}
	}, [playlistId, spotify]);
	return (
		<div className="text-white flex-grow">
			<header className="absolute top-5 right-8">
				<div className="flex items-center bg-rose-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
					<img
						src={session?.user?.image}
						alt=""
						className="w-8 h-8 rounded-full"
					/>
					<h2 className="text-black text-sm">{session?.user?.name}</h2>
					<ChevronDownIcon className="w-5 h-5 text-sm text-black" />
				</div>
			</header>
			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}>
				<img
					src={playlist?.images?.[0]?.url}
					alt=""
					className="h-44 w-44 shadow-2xl"
				/>
			</section>
		</div>
	);
};
export default Center;
