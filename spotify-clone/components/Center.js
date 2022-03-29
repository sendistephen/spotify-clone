import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";

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

	useEffect(() => {
		setColor(shuffle(colors).pop()); // randomize colors on page load
	}, []);

	return (
		<div className="text-white flex-grow">
			<header className="absolute top-5 right-8">
				<div className="flex items-center bg-rose-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
					<img src={session?.user?.image} alt="" />
					<h2>{session?.user?.name}</h2>
					<ChevronDownIcon className="w-5 h-5" />
				</div>
			</header>
			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}>
				<p>Center</p>
			</section>
		</div>
	);
};
export default Center;
