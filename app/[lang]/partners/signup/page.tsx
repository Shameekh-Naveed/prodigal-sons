import { UserRole } from "@/app/enums/user.enum"
import Signup from "@/components/Signup"

export default function Page() {
	return (
		<main className="min-h-[calc(100vh-192px)]">
			<Signup role={UserRole.PARTNER} />
		</main>
	)
}
