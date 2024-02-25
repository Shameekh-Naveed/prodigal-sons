"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { IoFastFood } from "react-icons/io5"
import Kaaba from "@/assets/kaaba.png"
import { FaCalendar } from "react-icons/fa"
import { IoMdMoon } from "react-icons/io"
import { MdOutlineFlightTakeoff } from "react-icons/md"
import Image from "next/image"
import { toast } from "sonner"

function DataDisplay({ tripSlug, tourID }: { tripSlug: any; tourID: any }) {
	const [trip, setTrip] = useState({} as any)
	const fetchData = async () => {
		try {
			console.log({ tourID })
			const res = await fetch(`/api/tour/${tourID}`, {
				cache: "no-cache"
			})
			const data = await res.json()
			const output = data.data.tour
			console.log({ output })
			setTrip(output)
			return output
		} catch (error) {}
	}

	const register = async () => {
		const body = {
			bill: trip.price,
			bookingCount: 1
		}
		try {
			const res = await fetch("/api/tour/register", {
				method: "POST",
				body: JSON.stringify(body)
			})
			const parsedRes = await res.json()
			if (!res.ok) {
				toast.error(parsedRes.message)
				toast.error(parsedRes.error)
			} else {
				toast.success("Successfully registered for tour")
			}
		} catch (error) {
			toast.error("Sorry! An unexpected error occured")
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	// return (
	// 	<div className="container mx-auto">
	// 		<div className="w-full min-h-96 mt-28 bg-secondary rounded-t-xl p-5 flex flex-col gap-2">
	// 			<h1 className="font-bold text-3xl">{tripSlug.yourTrip}</h1>
	// 			<div className="border w-full border-primary max-w-2xl" />
	// 			<div className="w-full">
	// 				<h2 className="font-semibold text-2xl">{tourData.title}</h2>
	// 				<div className="flex flex-row gap-2 font-light">
	// 					<h2 className="">
	// 						{tripSlug.type}: {tourData.type}
	// 					</h2>
	// 					<h2 className="">
	// 						{tripSlug.status}: {tourData.status}
	// 					</h2>
	// 				</div>
	// 			</div>
	// 			<desc className="text-lg ">{tourData.description}</desc>
	// 			<h1></h1>
	// 			{tourData.itinerary?.map((itinerary: any, index: number) => (
	// 				<ol className="relative border-s border-gray-200 dark:border-gray-700">
	// 					<Itinerary itinerary={itinerary} key={index} />
	// 				</ol>
	// 			))}
	// 			<div className="flex flex-col items-end gap-4">
	// 				<h2 className="text-2xl font-semibold">
	// 					Rs. {tourData.totalAmount}
	// 				</h2>
	// 				<div>
	// 					<Button>{tripSlug.checkout}</Button>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// )

	return (
		<div className="container mx-auto">
			<div className="w-full min-h-96 mt-28 bg-secondary rounded-t-xl p-5 pl-10 flex flex-col gap-2">
				{/* <div className="border w-full border-primary max-w-2xl" /> */}
				<div className="w-full">
					<h2 className="font-bold text-5xl my-4">{trip.title}</h2>
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
							<div className=" font-semibold">Type: {trip.type}</div>
							<div className="font-semibold">Status: {trip.status}</div>
							<div className="text-5xl font-semibold">
								$ {trip.totalAmount} / person
							</div>
							<div className="grid grid-cols-2 gap-8 mt-4">
								<div className="flex">
									<FaCalendar className="mt-1" />
									<h3 className="ml-2 text-md">
										{trip.departure} - {trip.arrival}
									</h3>
								</div>
								<div className="flex">
									<IoMdMoon className="mt-1" />
									<h3 className="ml-2 text-md">
										{trip.itinerary?.length} nights
									</h3>
								</div>
								<div className="flex">
									<MdOutlineFlightTakeoff className="mt-1" />
									<h3 className="ml-2 text-md">comfortable flight</h3>
								</div>

								<div className="flex">
									<IoFastFood className="mt-1" />
									<h3 className="ml-2 text-md">food included</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
				<h1 className="text-2xl font-semibold mt-8">Trip discription</h1>
				<desc className="text-xl ">{trip.description}</desc>
				<h1 className="text-xl font-semibold mt-4">
					Trip Organizer : {trip.organizerID}
				</h1>

				<h1 className="text-2xl font-semibold mt-8">Trip Itinerary</h1>
				{trip?.itinerary?.map((itinerary: any, index: number) => (
					<ol className="relative border-s border-gray-200 dark:border-gray-700">
						<Itinerary itinerary={itinerary} key={index} />
					</ol>
				))}
				<div className="flex flex-col items-end gap-4">
					<h2 className="text-2xl font-semibold">Rs. {trip.totalAmount}</h2>
					<div>
						<Button onClick={register}>Checkout</Button>
					</div>
				</div>
			</div>
		</div>
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

export default DataDisplay
