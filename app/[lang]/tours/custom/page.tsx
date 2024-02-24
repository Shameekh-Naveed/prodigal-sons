import CustomForm from "@/components/CustomForm"
import { Locale } from "@/i18n.config"

// * A page for adding custom trips
export default function Page({ params }: { params: { lang: Locale } }) {
	return (
		<main className="min-h-[calc(100vh-192px)] p-10">
			<div className="container mx-auto flex flex-col gap-8">
				<h1 className="text-4xl">Custom Trips</h1>
				<CustomForm />
			</div>
		</main>
	)
}
