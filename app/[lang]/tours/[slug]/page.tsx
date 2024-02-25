import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"
import DataDisplay from "../DataDisplay"

export default async function Page({
	params
}: {
	params: { lang: Locale; slug: string }
}) {
	const { tripSlug } = await getDictionary(params.lang)
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
