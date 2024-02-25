import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"
import DataDisplay from "./DataDisplay"

export default async function Page({
	params
}: {
	params: { lang: Locale; slug: string }
}) {
	const { tripSlug } = await getDictionary(params.lang)

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
			<DataDisplay tripSlug={tripSlug} tourID={params.slug} />
		</main>
	)
}
