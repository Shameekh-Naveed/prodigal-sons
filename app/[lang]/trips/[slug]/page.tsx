import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"

export default async function Page({ params }: { params: { lang: Locale } }) {
	const { tripSlug } = await getDictionary(params.lang)
	const trip = {
		title: "something",
		description:
			"something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something ",
		departure: new Date().toISOString().slice(0, 10),
		arrival: new Date().toISOString().slice(0, 10),
		organizerID: "1234567890",
		itinerary: {
			title: "something",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptatibus voluptates minus consequatur eligendi explicabo aut quas necessitatibus est, eaque, consequuntur velit quod! Rem atque saepe eius magnam, illo voluptatum!",
			day: 4,
			nightStay: "yes",
			attraction: [
				{
					time: "noon",
					title: "hiking",
					description:
						"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate veritatis labore saepe et totam minus repellendus voluptatibus nesciunt doloribus tenetur dolor laborum hic nemo exercitationem eligendi, fugiat explicabo nam possimus."
				},
				{
					time: "noon",
					title: "hiking",
					description:
						"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate veritatis labore saepe et totam minus repellendus voluptatibus nesciunt doloribus tenetur dolor laborum hic nemo exercitationem eligendi, fugiat explicabo nam possimus."
				},
				{
					time: "noon",
					title: "hiking",
					description:
						"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate veritatis labore saepe et totam minus repellendus voluptatibus nesciunt doloribus tenetur dolor laborum hic nemo exercitationem eligendi, fugiat explicabo nam possimus."
				}
			]
		},
		totalAmount: 123456,
		status: "pending",
		type: "religious"
	}
	return (
		<main
			className="min-h-[calc(100vh-192px)] p-10 pb-0 bg-center bg-cover"
			style={{
				backgroundImage: `url("https://www.bucuti.com/storage/app/uploads/public/5e3/c39/769/thumb_82_1920_1080_0_0_crop.jpg")`
			}}
		>
			<div className="container mx-auto">
				<div className="w-full min-h-96 mt-28 bg-secondary rounded-t-xl p-5 flex flex-col gap-2">
					<h1 className="font-bold text-3xl">{tripSlug.yourTrip}</h1>
					<div className="border w-full border-primary max-w-2xl" />
					<div className="w-full">
						<h2 className="font-semibold text-2xl">{trip.title}</h2>
						<div className="flex flex-row gap-2 font-light">
							<h2 className="">
								{tripSlug.type}: {trip.type}
							</h2>
							<h2 className="">
								{tripSlug.status}: {trip.status}
							</h2>
						</div>
					</div>
					<desc className="text-lg ">{trip.description}</desc>
					<Itinerary trip={trip} />
					<div className="flex flex-col lg:w-1/6 lg:justify-center justify-start items-end gap-4">
						<h2 className="text-2xl font-semibold">
							Rs. {trip.totalAmount}
						</h2>
						<Button>{tripSlug.checkout}</Button>
					</div>
				</div>
			</div>
		</main>
	)
}

const Itinerary = ({ trip }: { trip: any }) => {
	return (
		<div>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
				{trip.itinerary.title}
			</h3>
			<p className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
				{trip.itinerary.day}
			</p>
			<p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
				{trip.itinerary.description}
			</p>
			<ol className="relative border-s border-gray-200 dark:border-gray-700">
				{trip.itinerary.attraction.map(
					(attraction: any, index: number) => (
						<li className="mb-10 ms-4" key={index}>
							<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
							<p className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
								{attraction.time}
							</p>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								{attraction.title}
							</h3>
							<p className="text-base font-normal text-gray-500 dark:text-gray-400">
								{attraction.description}
							</p>
						</li>
					)
				)}
			</ol>
		</div>
	)
}