import React from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext
} from "./ui/carousel"
import Card from "./PlaceCard"

const CarouselHome = () => {
	return (
		<Carousel className="container">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
						<Card />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}

export default CarouselHome
