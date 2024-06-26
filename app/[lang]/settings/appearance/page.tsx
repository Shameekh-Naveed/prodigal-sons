import { Separator } from "@/components/ui/separator"
import { AppearanceForm } from "@/app/[lang]/settings/appearance/appearance-form"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function SettingsAppearancePage() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect("/signin")
	}

	return (
		<div className=" w-full flex min-h-[calc(100vh-192px)] flex-col">
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Appearance</h3>
					<p className="text-sm text-muted-foreground">
						Customize the appearance of the app. Automatically switch between
						day and night themes.
					</p>
				</div>
				<Separator />
				<AppearanceForm />
			</div>
		</div>
	)
}
