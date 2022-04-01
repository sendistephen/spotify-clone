import React, { useEffect, useState } from "react";
import {
	HomeIcon,
	SearchIcon,
	LibraryIcon,
	PlusCircleIcon,
	HeartIcon,
	RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlist.atom";

const Sidebar = () => {
	const [playlists, setPlaylists] = useState([]);
	const spotify = useSpotify();
	const { data: session, status } = useSession();
	const [_, setPlaylistId] = useRecoilState(playlistIdState);

	useEffect(() => {
		if (spotify.getAccessToken()) {
			spotify
				.getUserPlaylists()
				.then((data) => {
					setPlaylists(data.body.items);
				})
				.catch((err) => console.log(err));
		}
	}, [session, spotify]);

	return (
		<div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen min-w-[14rem] hidden md:inline-flex pb-36">
			<div className="space-y-4 flex-grow">
				<button
					className="flex items-center space-x-2 hover:text-white"
					onClick={() => signOut()}>
					<span>Log out</span>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HomeIcon className="h-5 w-5" />
					<p>Home</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<SearchIcon className="h-5 w-5" />
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<LibraryIcon className="h-5 w-5" />
					<p>Your Library</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900" />
				<button className="flex items-center space-x-2 hover:text-white">
					<PlusCircleIcon className="h-5 w-5" />
					<p>Create Playlist</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HeartIcon className="h-5 w-5" />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className="h-5 w-5" />
					<p>Your Episodes</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900" />
				{playlists.map((playlist) => (
					<p
						className="hover:text-white cursor-pointer"
						key={playlist.id}
						onClick={() => setPlaylistId(playlist.id)}>
						{playlist.name}
					</p>
				))}
			</div>
		</div>
	);
};
export default Sidebar;
