"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function DataDisplay({ tripSlug, tourID }: { tripSlug: any; tourID: any }) {
	const [tourData, setTourData] = useState({} as any)
	const fetchData = async () => {
		try {
			console.log({ tourID })
			const res = await fetch(`/api/tour/${tourID}`, {
				cache: "no-cache"
			})
			const data = await res.json()
			const output = data.data.tour
			setTourData(output)
			return output
		} catch (error) {}
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="container mx-auto">
			<div className="w-full min-h-96 mt-28 bg-secondary rounded-t-xl p-5 flex flex-col gap-2">
				<h1 className="font-bold text-3xl">{tripSlug.yourTrip}</h1>
				<div className="border w-full border-primary max-w-2xl" />
				<div className="w-full">
					<h2 className="font-semibold text-2xl">{tourData.title}</h2>
					<div className="flex flex-row gap-2 font-light">
						<h2 className="">
							{tripSlug.type}: {tourData.type}
						</h2>
						<h2 className="">
							{tripSlug.status}: {tourData.status}
						</h2>
					</div>
				</div>
				<desc className="text-lg ">{tourData.description}</desc>
				<h1></h1>
				{tourData.itinerary?.map((itinerary: any, index: number) => (
					<ol className="relative border-s border-gray-200 dark:border-gray-700">
						<Itinerary itinerary={itinerary} key={index} />
					</ol>
				))}
				<div className="flex flex-col items-end gap-4">
					<h2 className="text-2xl font-semibold">
						Rs. {tourData.totalAmount}
					</h2>
					<div>
						<Button>{tripSlug.checkout}</Button>
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
