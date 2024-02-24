"use client"
import React from "react"
import { Button } from "./ui/button"

const Banner: React.FC = () => {
	return (
		<div className="bg-primary">
			<div className="container min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center gap-8">
				<h2 className="text-3xl font-bold leading-9 text-white sm:text-4xl sm:leading-10">
					Welcome to GameZone
				</h2>
				<p className="text-lg leading-7 text-gray-300 flex justify-center">
					Your one-stop shop for all things gaming. Browse our
					collection of the latest games, consoles, and accessories.
				</p>
				<Button className="invert w-fit" onClick={() => {}}>
					Shop Now
				</Button>
			</div>
		</div>
	)
}

export default Banner
