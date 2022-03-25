import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<Head>
				<title>Spotify clone</title>
				<meta name="description" content="A cool spotify clone" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				{/* sidebar */}
				<Sidebar />
				{/* Center */}
				<div>{/* Player */}</div>
			</main>
		</div>
	);
}
