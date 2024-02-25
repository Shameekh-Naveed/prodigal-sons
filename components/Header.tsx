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
import { useAtom, useSetAtom } from "jotai"
import { LoggedInAtom, UserAtom } from "@/utils/atoms"
import Image from "next/image"
import { Session } from "next-auth"
import Default from "@/assets/default.jpg"
import Logo from "@/assets/log.png"

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
	const [user, setUser] = useAtom(UserAtom)

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
		getSession().then((session: Session | null) => {
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
					<Image
						id="avatarButton"
						className=" rounded-full cursor-pointer"
						width={140}
						height={140}
						// @ts-ignore
						src={Logo}
						alt="User dropdown"
					/>
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
							setTheme(resolvedTheme === "dark" ? "light" : "dark")
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
										className=" rounded-full cursor-pointer"
										width={90}
										height={90}
										// @ts-ignore
										src={Default}
										alt="User dropdown"
									/>
								</div>

								<div
									id="userDropdown"
									ref={menuRef}
									className="absolute right-0 hidden z-10 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600"
								>
									<ul
										className="py-2 text-sm text-gray-700 dark:text-gray-200"
										aria-labelledby="avatarButton"
									>
										<li>
											<Link
												href="/settings"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Settings
											</Link>
										</li>
									</ul>
									<div className="py-1">
										<button
											onClick={() => {
												signOut()
												setLoggedIn(false)
												localStorage.removeItem("user")
												setUser(null)
											}}
											className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Sign out
										</button>
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
