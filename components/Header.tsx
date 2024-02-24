"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
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
import Image from "next/image"

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
	const menuRef = useRef<HTMLDivElement>(null)
	const links = [...header]
	const toggleMenu = () => {
		const menu = menuRef.current
		if (menu) {
			menu?.classList?.toggle("hidden")
		}
	}

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
							<div className="relative">
								<div onClick={() => toggleMenu()}>
									<Image
										id="avatarButton"
										className="w-10 h-10 rounded-full cursor-pointer"
										width={40}
										height={40}
										src="/docs/images/people/profile-picture-5.jpg"
										alt="User dropdown"
										width={40}
										height={40}
									/>
								</div>

								<div
									id="userDropdown"
									ref={menuRef}
									className="absolute right-0 z-10 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600"
								>
									<ul
										className="py-2 text-sm text-gray-700 dark:text-gray-200"
										aria-labelledby="avatarButton"
									>
										<li>
											<Link
												href="#"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Dashboard
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Settings
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Earnings
											</Link>
										</li>
									</ul>
									<div className="py-1">
										<Link
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Sign out
										</Link>
									</div>
								</div>
							</div>
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
