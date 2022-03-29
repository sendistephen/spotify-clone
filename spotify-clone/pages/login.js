import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

const login = ({ providers }) => {
	return (
		<div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
			<div className="flex flex-col items-center space-y-2">
				<div className="w-24 h-24  relative ">
					<Image
						layout="fill"
						objectFit="cover"
						src="/images/spotify-logo.png"
						alt="Spotify"
						className="mb-5"
					/>
				</div>
				{Object.values(providers).map((provider, i) => (
					<div key={i}>
						<button
							onClick={() => signIn(provider.id, { callbackUrl: "" })}
							className="bg-[#18D860] text-white p-5 rounded-lg">
							Login with {provider.name}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default login;

// this function runs on the server before the login page loads
export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
