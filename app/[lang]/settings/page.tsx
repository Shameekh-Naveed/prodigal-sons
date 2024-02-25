import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/app/[lang]/settings/profile-form"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function SettingsProfilePage() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect("/signin")
	}
	return (
		<div className="flex w-full">
			<div className="space-y-6 w-full">
				<div>
					<h3 className="text-lg font-medium">Profile</h3>
					<p className="text-sm text-muted-foreground">
						This is how others will see you on the site.
					</p>
				</div>
				<Separator />
				<ProfileForm />
			</div>
		</div>
	)
}
