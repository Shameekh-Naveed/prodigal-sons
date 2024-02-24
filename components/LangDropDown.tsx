"use client"
import { i18n, Locale } from "@/i18n.config"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SlArrowDown } from "react-icons/sl"
import Image from "next/image"

export default function LangDropDown({ lang }: { lang: Locale }) {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		i18n.locales.forEach(locale => {
			router.prefetch(`/${locale}`)
		})
	}, [router])

	const getFlagEmoji = (languageCode: string) => {
		switch (languageCode) {
			case "en":
				return "🇺🇸"
			case "de":
				return "🇩🇪"
			default:
				return languageCode.toUpperCase()
		}
	}

	const openDropdown = () => setIsOpen(true)
	const closeDropdown = () => setIsOpen(false)

	return (
		<div
			className="relative flex flex-col items-center justify-center w-full h-full"
			onMouseLeave={closeDropdown}
		>
			<button
				className="bg-blue-200 dark:bg-gray-900 font-medium rounded-lg gap-2 text-sm px-5 py-2.5 text-center inline-flex items-center"
				type="button"
				onMouseEnter={openDropdown}
			>
				<div className="w-full md:flex hidden flex-row justify-between items-center md:gap-4">
					{getFlagEmoji(lang)}
				</div>
				<SlArrowDown className="dark:text-white" />
			</button>

			{isOpen && (
				<div
					className="absolute top-[100%] z-10 bg-secondary divide-y divide-secondary  rounded-lg shadow w-full "
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}
				>
					<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
						{i18n.locales.map(locale => (
							<li key={locale}>
								<Link
									href={`/${locale}`}
									className={`px-4 py-2 flex justify-center hover:bg-slate-400 ${
										locale === lang ? "font-bold" : ""
									}`}
									onClick={() => setIsOpen(false)}
								>
									{getFlagEmoji(locale)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
