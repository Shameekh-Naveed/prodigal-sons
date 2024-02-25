"use client"
import { Tour } from "@/app/database/schemas/tour.schema"
import { TourCategory } from "@/app/enums/tour.enum"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"
import Link from "next/link"
import { redirect } from "next/navigation"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"
import Filter from "@/components/Filter"
import { Trips } from "@/components/Trips"

export default function Page({ params }: { params: { lang: Locale } }) {
	const releTours = [
		{
			title: "something",
			description:
				"something something something something something something something something something something something ",
			departure: new Date().toISOString().slice(0, 10),
			arrival: new Date().toISOString().slice(0, 10),
			organizerID: "1234567890",
			// itinerary: [{ type: itinerarySchema, default: [] }],
			totalAmount: 123456,
			status: "pending",
			type: "religious"
		},
		{
			title: "something",
			description: "something",
			departure: new Date().toISOString().slice(0, 10),
			arrival: new Date().toISOString().slice(0, 10),
			organizerID: "1234567890",
			// itinerary: [{ type: itinerarySchema, default: [] }],
			totalAmount: 123456,
			status: "pending",
			type: "religious"
		},
		{
			title: "something",
			description: "something",
			departure: new Date().toISOString().slice(0, 10),
			arrival: new Date().toISOString().slice(0, 10),
			organizerID: "1234567890",
			// itinerary: [{ type: itinerarySchema, default: [] }],
			totalAmount: 123456,
			status: "pending",
			type: "religious"
		}
	]

	const culTours = [
		{
			title: "dsalksad;la",
			description: "data adada",
			departure: {
				$date: "2025-04-27T00:00:00.000Z"
			},
			arrival: {
				$date: "2025-04-27T00:00:00.000Z"
			},
			organizerID: {
				$oid: "65da44f6dcafea947c48b2bd"
			},
			itinerary: [
				{
					title: "wqewqkj",
					description: "lkj",
					day: 1,
					nightStay: "kjwlkj",
					_id: {
						$oid: "65da4aa0445a8104746272fd"
					}
				},
				{
					title: "lkjlkjlk",
					description: "lkjlkj",
					day: 1,
					nightStay: "asdsa",
					_id: {
						$oid: "65da4aa0445a8104746272fe"
					}
				}
			],
			price: 0,
			status: "requested",
			type: "day-trip",
			category: "relegious",
			createdAt: {
				$date: "2024-02-24T19:59:28.374Z"
			},
			updatedAt: {
				$date: "2024-02-24T19:59:28.374Z"
			},
			__v: 0
		}
	]
	return (
		<main className="min-h-[calc(100vh-192px)] p-10">
			<div className="container mx-auto flex flex-col items-center gap-8">
				<div className="container mx-auto flex justify-center">
					<div
						className="h-[15rem] rounded-2xl flex bg-cover bg-bottom relative w-full"
						style={{
							backgroundImage:
								"url('https://businessschool.luiss.it/tourism-management/wp-content/uploads/sites/4/2023/06/shutterstock_1774042925-scaled-e1686324435575.jpg')"
						}}
					>
						<div className="absolute w-full h-full bg-black opacity-10 rounded-2xl"></div>

						<div className="flex flex-col justify-center w-2/3 z-20">
							<h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-primary w-2/3 mb-8 pl-8">
								Plan your trip now.
							</h1>
							<h1 className="text-sm md:text-xl lg:text-xl font-bold text-primary w-2/3 pl-8">
								Get a personalized itinerary just for you, guided by
								traveler tips and reviews.
							</h1>
						</div>
						<div className="flex justify-end items-end w-1/3 z-20 md:pr-8">
							<Button className="bg-secondary text-primary hover:text-secondary px-4 py-2 w-30 font-bold mb-6 rounded-full">
								<Link href={"/tours/custom"}>Design custom trip</Link>
							</Button>
						</div>
					</div>
				</div>
				<div className="container mx-auto flex justify-center">
					<div
						className="h-[20rem] rounded-2xl flex bg-cover bg-bottom relative w-full"
						style={{
							backgroundImage:
								"url('https://wallpapers.com/images/featured/kaaba-a2wif1x8on9qihxv.jpg')"
						}}
					>
						<div className="absolute w-full h-full bg-black opacity-30 rounded-2xl"></div>

						<div className="flex flex-col justify-center w-2/3 z-20">
							<h1 className="text-2xl text-white md:text-4xl lg:text-4xl font-bold text-secondary w-2/3 mb-8 pl-8">
								Check out our Hajj and Umrah packages
							</h1>
							<h1 className="text-sm md:text-xl text-white lg:text-xl font-bold text-secondary w-2/3 pl-8">
								We have a wide range of religious packages especially made
								for Pilgrims.
							</h1>
						</div>
						<div className="flex justify-end items-end w-1/3 z-20 md:pr-8">
							<Button className="bg-secondary text-primary hover:text-secondary px-4 py-2 w-30 font-bold mb-6 rounded-full">
								<Link href={"/quwa"}>Explore Quwa</Link>
							</Button>
						</div>
					</div>
				</div>
				<Filter />
				<Trips tours={releTours} />
			</div>
		</main>
	)
}

const fetchData = async (category: TourCategory) => {
	try {
		const data = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}api/tour?category=${category}`,
			{
				cache: "no-store"
			}
		)
		const parsedRes = await data.json()
		console.log({ parsedRes })
		const tours = parsedRes.data.tours
		return tours
	} catch (error) {
		console.log({ error })
		return []
	}
}
