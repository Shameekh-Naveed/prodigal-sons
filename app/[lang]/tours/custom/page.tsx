import CustomForm from "@/components/CustomForm"
import { Locale } from "@/i18n.config"
import { redirect } from "next/navigation"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"

// * A page for adding custom trips
export default async function Page({ params }: { params: { lang: Locale } }) {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect("/signin")
	}
	return (
		<main className="min-h-[calc(100vh-192px)] p-10">
			<div className="container mx-auto flex flex-col gap-8">
				<h1 className="text-4xl">Custom Trips</h1>
				<CustomForm />
			</div>
		</main>
	)
}
