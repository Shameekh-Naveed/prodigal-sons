import { Separator } from "@/components/ui/separator"
import Trip from "@/components/pastTrips"

export default async function SettingsAppearancePage() {
	const pastTrips = await fetchPastTrips()
	return (
		<div className=" w-full 2xl:w-[140%] flex min-h-[calc(100vh-192px)] flex-col">
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Your past trips</h3>
					<p className="text-sm text-muted-foreground">
						View and manage your past trips. Leave reviews and
						ratings on your past trips.
					</p>
				</div>
				<Separator />
				{pastTrips.map((trip: any) => (
					<Trip
						Title={trip.tourID.title}
						departure={trip.tourID.departure}
						arrival={trip.tourID.arrival}
						price={trip.tourID.price}
					/>
				))}
			</div>
		</div>
	)
}

const fetchPastTrips = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}api/tour/pastTours`
		)
		const parsedRes = await res.json()
		console.log({ parsedRes })
		const data = parsedRes.data.tours
		if (!res.ok) return []
		return data
	} catch (error) {
		console.log({ error })
		return []
	}
}
