"use client"
import React, { useEffect, useState } from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext
} from "./ui/carousel"
import Card from "./CarouselCard"
import { toast } from "sonner"
import { Tour } from "@/app/database/schemas/tour.schema"

export default function CarouselHome() {
	const [data, setData] = useState([])
	useEffect(() => {
		fetchData().then(data => setData(data))
	}, [])

	return (
		<Carousel className="container">
			<CarouselContent>
				{data.map((tour: Tour, index: number) => (
					<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
						<Card
							name={tour.title as string}
							description={tour.description as string}
							image={tour.image as string}
							link={`/tour/${tour._id as string}`}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}

const fetchData = async () => {
	try {
		const res = await fetch(
			process.env.HOST || "http://localhost:3000/" + `api/tour/trending`
		)
		const parsedRes = await res.json()
		if (!res.ok) {
			toast.error(parsedRes.message)
			toast.error(parsedRes.error)
		}
		const tours = parsedRes.data.tours
		return tours
	} catch (err) {
		return []
	}
}

// export default CarouselHome
