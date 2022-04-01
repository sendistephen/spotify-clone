import { atom } from "recoil";

// single playlist
export const playlistIdState = atom({
	key: "playlistIdState",
	default: "2C3ABZoyALVPuv53S3Qr0x",
});

// Get a list of playlists for the current user
export const playlistState = atom({
	key: "playlistState",
	default: [],
});
