import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"

interface CardProps {
	name: string
	link: string
}

const Card = ({ name, link }: CardProps) => {
	return (
		<div
			className="w-76 min-[1495px]:w-96 relative border-gray-100 rounded-xl shadow-md m-4 h-64 bg-cover bg-center group flex justify-center items-center"
			style={{
				backgroundImage: `url(${link})`
			}}
		>
			<div className="absolute w-full h-full group-hover:blur-sm duration-200"></div>
			<h1 className="  z-10 text-4xl md:text-5xl lg:text-2xl font-bold text-white">
				{name}
			</h1>
		</div>
	)
}

export default Card
