import React from "react"
import { Button } from "./ui/button"
import Link from "next/link"

interface CardProps {
	name: string
	description: string
	image: string
	link: string
}

const Card = ({ name, description, image, link }: CardProps) => {
	return (
		<div className="w-76 min-[1495px]:w-96 border-gray-100 rounded-xl shadow-md m-4">
			<img
				className="rounded-t-xl w-full h-60 object-cover"
				src={
					image ||
					"https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
				}
				alt="Shoes"
			/>
			<div className="flex flex-col gap-4 p-4">
				<h2 className="font-bold text-xl">{name || "Lahore"}</h2>
				<p className="text-md">{description || "Lahore Lahore ae"}</p>
				<Button className="">
					<Link href={link || "/home"}>Visit now</Link>
				</Button>
			</div>
		</div>
	)
}

export default Card
