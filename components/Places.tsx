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
				<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
					<Card
						name="Lahore"
						link="https://upload.wikimedia.org/wikipedia/commons/e/e0/Badshahi_Mosque%2C_Lahore_I.jpg"
					/>
				</CarouselItem>
				<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
					<Card
						name="Karachi"
						link="https://cdn.britannica.com/85/128585-050-5A1BDD02/Karachi-Pakistan.jpg"
					/>
				</CarouselItem>

				<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
					<Card
						name="Islamabad"
						link="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Faisal_Masjid_From_Damn_e_koh.jpg/1200px-Faisal_Masjid_From_Damn_e_koh.jpg"
					/>
				</CarouselItem>

				<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
					<Card
						name="Multan"
						link="https://facts.net/wp-content/uploads/2023/07/48-facts-about-multan-1688386696.jpeg"
					/>
				</CarouselItem>

				<CarouselItem className="sm:basis-1/2 min-[1300px]:basis-1/4 min-[1495px]:basis-1/3">
					<Card
						name="Peshawar"
						link="https://skyticket.com/guide/wp-content/uploads/2017/12/iStock-538601654-e1540535918101-680x382.jpg"
					/>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}

export default CarouselHome
