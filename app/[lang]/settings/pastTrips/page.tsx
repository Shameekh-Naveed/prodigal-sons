import { Separator } from "@/components/ui/separator"
import Trip from "@/components/pastTrips"

export default function SettingsAppearancePage() {
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
				<Trip />
			</div>
		</div>
	)
}
