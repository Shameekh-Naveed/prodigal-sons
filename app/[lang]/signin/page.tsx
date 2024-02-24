import Signin from "@/components/Signin"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (session) {
		redirect("/")
	}

	return (
		<main className="min-h-[calc(100vh-192px)]">
			<Signin />
		</main>
	)
}
