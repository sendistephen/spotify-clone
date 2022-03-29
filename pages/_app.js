import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		// persists the login state
		<SessionProvider session={session}>
			<Component {...pageProps} />)
		</SessionProvider>
	);
}

export default MyApp;
