"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FcIcons8Cup } from "react-icons/fc"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { RxHamburgerMenu } from "react-icons/rx"
import { Locale } from "@/i18n.config"
import LangDropDown from "./LangDropDown"
import { Button } from "./ui/button"
import { getSession, signOut } from "next-auth/react"
import { useAtom } from "jotai"
import { LoggedInAtom } from "@/utils/atoms"

export default function Header({
	header,
	params
}: {
	header: {
		href: string
		label: string
	}[]
	params: { lang: Locale }
}) {
	const { resolvedTheme, setTheme } = useTheme()
	const [loggedIn, setLoggedIn] = useAtom(LoggedInAtom)
	const [mounted, setMounted] = useState(false)
	const links = [...header]
	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		getSession().then(session => {
			if (session) {
				setLoggedIn(true)
			}
		})
	}, [setLoggedIn])

	useEffect(() => {
		const toggleTheme = () => {
			setTheme(resolvedTheme === "dark" ? "light" : "dark")
		}

		return () => {
			window.removeEventListener("themechange", toggleTheme)
		}
	}, [resolvedTheme, setTheme])

	return (
		<header className="h-24 bg-secondary flex">
			<div className="container flex justify-between items-center mx-auto">
				<div>
					<FcIcons8Cup className="text-4xl" />
				</div>
				<div className="md:flex flex-row gap-6 -mb-3 hidden">
					{links.map(({ href, label }) => (
						<div
							className="gap-1 flex flex-col group"
							key={`${href}${label}`}
						>
							<Link
								href={href}
								className="text-primary font-semibold text-md hover:text-primary"
							>
								{label}
							</Link>
							<div className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-200 rounded-full"></div>
						</div>
					))}
				</div>
				<div className="flex flex-row gap-4">
					<LangDropDown lang={params.lang} />
					<button
						aria-label="Toggle Dark Mode"
						type="button"
						className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-700"
						onClick={() => {
							setTheme(
								resolvedTheme === "dark" ? "light" : "dark"
							)
						}}
					>
						{mounted &&
							(resolvedTheme === "dark" ? (
								<Sun className="h-5 w-5 text-orange-300" />
							) : (
								<Moon className="h-5 w-5 text-slate-800" />
							))}
					</button>
					{mounted &&
						(loggedIn ? (
							<Button
								onClick={async () => {
									await signOut()
									setLoggedIn(false)
								}}
							>
								Logout
							</Button>
						) : (
							<>
								<Link href="/signin" passHref>
									<Button>Sign in</Button>
								</Link>
							</>
						))}
					<RxHamburgerMenu className="w-6 h-6 self-center justify-center md:hidden block" />
				</div>
			</div>
		</header>
	)
}
