import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<Head>
				<title>Spotify clone</title>
				<meta name="description" content="A cool spotify clone" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex">
				<Sidebar />
				<Center />
			</main>
		</div>
	);
}

// prefetch the session so we can check if the user is logged in and there is a token before the client side render
export async function getServerSideProps(context) {
	const session = await getSession(context);
	return {
		props: { session },
	};
}
