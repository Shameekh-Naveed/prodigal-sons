import { Tour } from "@/app/database/schemas/tour.schema"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"

export default async function Page({ params }: { params: { lang: Locale } }) {
	const { trips } = await getDictionary(params.lang)
	const tours = [
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
	return (
		<main className="min-h-[calc(100vh-192px)] p-10">
			<div className="container mx-auto flex flex-col items-center gap-8">
				<div className="w-full bg-blue-950 dark:bg-blue-200 h-56 rounded-lg dark:text-black text-white flex flex-col p-4 gap-2">
					<h1 className="text-6xl">{trips.banner.headline}</h1>
					<h3 className="text-2xl">{trips.banner.subHeadline}</h3>
				</div>
				<div className="h-56 bg-blue-500 w-full rounded-lg">
					filter thing here
				</div>
				<Trips
					tours={tours}
					trips={trips}
					tripsKey={"religious-trips"}
				/>
				<Trips
					tours={tours}
					trips={trips}
					tripsKey={"cultural-trips"}
				/>
				<Trips tours={tours} trips={trips} tripsKey={"explore"} />
			</div>
		</main>
	)
}

const Trips = ({
	tours,
	trips,
	tripsKey
}: {
	tours: any
	trips: any
	tripsKey: String
}) => (
	<div className="w-full flex flex-col gap-4">
		<h3 className="text-start text-2xl">{trips[`${tripsKey}`].title}</h3>
		<div className="gap-2 flex flex-col">
			{tours.map((tour: any, index: number) => (
				<div className="min-h-56 bg-secondary w-full rounded-lg p-4 flex lg:flex-row flex-col gap-2 justify-center lg:items-center items-start">
					<div className="lg:w-1/6 h-full justify-start lg:justify-center items-center flex lg:flex-col gap-4">
						<div className="h-20 rounded-full aspect-square bg-primary"></div>
						<h1 className="text-2xl font-semibold ">
							{tour.title}
						</h1>
					</div>
					<div className="flex flex-row h-full justify-between lg:justify-center items-center gap-10 lg:w-4/6">
						<div className="flex flex-col gap-2">
							<h3 className="text-2xl font-semibold">
								{trips[`${tripsKey}`].departure}
							</h3>
							<h2>{`${tour.arrival}`}</h2>
						</div>
						<div className="border border-primary w-64"></div>
						<div className="flex flex-col gap-2">
							<h3 className="text-2xl font-semibold">
								{trips[`${tripsKey}`].arrival}
							</h3>
							<h2>{`${tour.departure}`}</h2>
						</div>
					</div>
					<div className="flex lg:flex-col flex-row lg:w-1/6 lg:justify-center justify-start items-end gap-4">
						<div>
							<h2 className="text-2xl font-semibold">
								{trips[`${tripsKey}`].price}
							</h2>
							<h3 className="text-lg">Rs. {tour.totalAmount}</h3>
						</div>
						<Button>{trips[`${tripsKey}`].details}</Button>
					</div>
				</div>
			))}
		</div>
		<div className="w-full justify-center items-center flex">
			<Button className="">Show More ...</Button>
		</div>
	</div>
)
