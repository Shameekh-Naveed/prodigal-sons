"use client"
import Link from "next/link"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Button } from "./ui/button"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useSetAtom } from "jotai"
import { LoggedInAtom } from "@/utils/atoms"

type State = {
	email: string
	password: string
}

export default function Signin() {
	const [values, setValues] = useState<State>({
		email: "",
		password: ""
	})
	const setLoggedIn = useSetAtom(LoggedInAtom)

	const router = useRouter()

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value })
		}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email: values.email,
				password: values.password
			})
			if (res?.status === 401) {
				toast.error("Invalid email or password")
			} else if (res?.error) {
				toast.error(res.error)
			} else {
				toast.success("Signed in successfully")
				setLoggedIn(true)
				setTimeout(() => {
					router.replace("/")
				}, 1000)
			}
		} catch (error) {
			toast.error(
				`An error occurred. Please try again later, error: ${error}`
			)
		}
	}

	const OAuthGoogleURL = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_URL ?? "#"
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
					Sign in to your account
				</h2>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-black"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										onChange={handleChange("email")}
										required
										className="block w-full rounded-md border-0 py-1.5 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-black"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										onChange={handleChange("password")}
										name="password"
										type="password"
										autoComplete="current-password"
										minLength={8}
										required
										className="block w-full rounded-md border-0 py-1.5 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="text-sm leading-6">
									<a
										href="#"
										className="font-semibold text-black hover:text-slate-700"
									>
										Forgot password?
									</a>
								</div>
							</div>

							<div>
								<Button
									type="submit"
									className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-black"
								>
									Sign in
								</Button>
							</div>
						</form>

						<div>
							<div className="relative mt-10">
								<div
									className="absolute inset-0 flex items-center"
									aria-hidden="true"
								>
									<div className="w-full border-t border-gray-200" />
								</div>
								<div className="relative flex justify-center text-sm font-medium leading-6">
									<span className="bg-white px-6 text-black">
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-1 gap-4">
								<Link
									href={OAuthGoogleURL}
									className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
								>
									<FcGoogle className="h-5 w-5" />
									<span className="text-sm font-semibold leading-6 text-black">
										Google
									</span>
								</Link>
							</div>
						</div>
					</div>

					<p className="mt-10 text-center text-sm text-primary">
						Not a member?{" "}
						<Link
							href="/signup"
							className="font-semibold leading-6 text-primary hover:text-slate-700"
						>
							Signup!
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}
