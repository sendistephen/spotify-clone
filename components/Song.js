import { currentTrackIdState } from "../atoms/song.atom";
import useSpotify from "../hooks/useSpotify";
import { MillisMinsAndSeconds } from "../lib/time";

function Song({ track, order }) {
	const [currentTrackID, setCurrentTrackID] =
		useRecoildState(currentTrackIdState);

	const [isPlaying, setIsPlaying] = useRecoildState(isPlayingState);

	const spotify = useSpotify();

	const playSong = () => {
		setCurrentTrackID(track.id);
		setIsPlaying(true);
		// call spotify api to play song
		spotify.play({
			uris: [track.uri],
		});
	};

	return (
		<div
			onClick={playSong}
			className="grid grid-cols-2 text-gray-500 hover:bg-gray-900 px-5 py-4 rounded-lg cursor-pointer">
			<div className="flex space-x-4  items-center ">
				<p>{order + 1}</p>
				<img src={track?.album?.images[0]?.url} alt="" className="h-10 w-10" />
				<div>
					<p className="text-white text-sm">{track?.name}</p>
					<p className="text-white text-sm w-36 lg:w-64 truncate">
						{track?.artists[0]?.name}
					</p>
				</div>
				<div className="flex items-center justify-between ml-auto md:ml-0">
					<p className="hidden md:inline w-40 lg:w-80 truncate">
						{track?.album?.name}
					</p>
					<p>{MillisMinsAndSeconds(track?.duration_ms)}</p>
				</div>
			</div>
		</div>
	);
}
export default Song;
