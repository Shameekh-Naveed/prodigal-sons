import { UserRole } from "@/app/enums/user.enum"
import Signup from "@/components/Signup"
import { redirect } from "next/navigation"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect("/signin")
	}
	return (
		<main className="min-h-[calc(100vh-192px)]">
			<Signup role={UserRole.PARTNER} />
		</main>
	)
}
