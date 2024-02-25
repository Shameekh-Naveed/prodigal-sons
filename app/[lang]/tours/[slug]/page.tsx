"use client"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"
import Image from "next/image"
import Kaaba from "@/assets/kaaba.png"
import { FaCalendar } from "react-icons/fa"
import { IoMdMoon } from "react-icons/io"
import { MdOutlineFlightTakeoff } from "react-icons/md"
import { IoFastFood } from "react-icons/io5"

export default async function Page() {
	const trip = {
		title: "Shahi Masjid",
		description:
			"something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something ",
		departure: new Date().toISOString().slice(0, 10),
		arrival: new Date().toISOString().slice(0, 10),
		organizerID: "1234567890",
		itinerary: [
			{
				title: "something",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatibus voluptates minus consequatur eligendi explicabo aut quas necessitatibus est, eaque, consequuntur velit quod! Rem atque saepe eius magnam, illo voluptatum!",
				day: 4,
				nightStay: "yes"
			},
			{
				title: "something",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatibus voluptates minus consequatur eligendi explicabo aut quas necessitatibus est, eaque, consequuntur velit quod! Rem atque saepe eius magnam, illo voluptatum!",
				day: 4,
				nightStay: "yes"
			},
			{
				title: "something",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatibus voluptates minus consequatur eligendi explicabo aut quas necessitatibus est, eaque, consequuntur velit quod! Rem atque saepe eius magnam, illo voluptatum!",
				day: 4,
				nightStay: "yes"
			},
			{
				title: "something",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatibus voluptates minus consequatur eligendi explicabo aut quas necessitatibus est, eaque, consequuntur velit quod! Rem atque saepe eius magnam, illo voluptatum!",
				day: 4,
				nightStay: "yes"
			}
		],
		totalAmount: 123456,
		status: "Pending",
		type: "Religious Trip"
	}
	return (
		<main
			className="min-h-[calc(100vh-192px)] p-10 pb-0 bg-center bg-cover"
			style={{
				backgroundImage: `url("https://www.bucuti.com/storage/app/uploads/public/5e3/c39/769/thumb_82_1920_1080_0_0_crop.jpg")`
			}}
		>
			<div className="container mx-auto">
				<div className="w-full min-h-96 mt-28 bg-secondary rounded-t-xl p-5 pl-10 flex flex-col gap-2">
					{/* <div className="border w-full border-primary max-w-2xl" /> */}
					<div className="w-full">
						<h2 className="font-bold text-5xl my-4">
							{trip.title}
						</h2>
						<div className="flex flex-col min-[1200px]:flex-row max-[1200px]:items-start ">
							<div className="relative w-full h-[20rem] md:h-[30rem]">
								<Image
									src={Kaaba}
									alt="Ka'aba"
									fill
									className="border-4 border-primary rounded-xl object-contain"
								/>
							</div>
							<div className="flex flex-col text-xl font-light gap-4 ml-4 mt-8 min-[1200px]:ml-24">
								<div className=" font-semibold">
									Type: {trip.type}
								</div>
								<div className="font-semibold">
									Status: {trip.status}
								</div>
								<div className="text-5xl font-semibold">
									$ {trip.totalAmount} / person
								</div>
								<div className="grid grid-cols-2 gap-8 mt-4">
									<div className="flex">
										<FaCalendar className="mt-1" />
										<h3 className="ml-2 text-md">
											{trip.departure}- {trip.arrival}
										</h3>
									</div>
									<div className="flex">
										<IoMdMoon className="mt-1" />
										<h3 className="ml-2 text-md">
											{trip.itinerary.length} nights
										</h3>
									</div>
									<div className="flex">
										<MdOutlineFlightTakeoff className="mt-1" />
										<h3 className="ml-2 text-md">
											comfortable flight
										</h3>
									</div>

									<div className="flex">
										<IoFastFood className="mt-1" />
										<h3 className="ml-2 text-md">
											food included
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h1 className="text-2xl font-semibold mt-8">
						Trip discription
					</h1>
					<desc className="text-xl ">{trip.description}</desc>
					<h1 className="text-xl font-semibold mt-4">
						Trip Organizer : {trip.organizerID}
					</h1>

					<h1 className="text-2xl font-semibold mt-8">
						Trip Itinerary
					</h1>
					{trip.itinerary.map((itinerary: any, index: number) => (
						<ol className="relative border-s border-gray-200 dark:border-gray-700">
							<Itinerary itinerary={itinerary} key={index} />
						</ol>
					))}
					<div className="flex flex-col items-end gap-4">
						<h2 className="text-2xl font-semibold">
							Rs. {trip.totalAmount}
						</h2>
						<div>
							<Button>Checkout</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

const Itinerary = ({ itinerary }: { itinerary: any }) => {
	return (
		<li className="mb-10 ms-4">
			<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
			<p className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
				{itinerary.title}
			</p>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
				{itinerary.day}
			</h3>
			<p className="text-base font-normal text-gray-500 dark:text-gray-400">
				{itinerary.description}
			</p>
		</li>
	)
}
