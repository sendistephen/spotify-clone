import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
	const { data: session } = useSession();

	useEffect(() => {
		if (session) {
			if (session?.error === "RefreshAccessTokenError") {
				// push user to signin page
				signIn();
			}
			// all good
			spotifyApi.setAccessToken(session.user.accessToken);
		}
	}, [session]); // will run on mount and whenever session changes
	return spotifyApi;
};
export default useSpotify;