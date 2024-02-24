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
				backgroundImage:
					"url('https://a.cdn-hotels.com/gdcs/production18/d1838/041ae6b1-0a88-4c22-a648-53a22dd4a006.jpg?impolicy=fcrop&w=800&h=533&q=medium')"
			}}
		>
			<div className="absolute w-full h-full group-hover:blur-sm duration-200"></div>
			<h1 className="hidden group-hover:block duration-200 z-10 text-4xl md:text-5xl lg:text-2xl font-bold text-primary">
				Hello Jee
			</h1>
		</div>
	)
}

export default Card
