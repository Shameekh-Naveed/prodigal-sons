"use client"
import { UserRole } from "@/app/enums/user.enum"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

type State = {
	firstName: string
	lastName: string
	email: string
	password: string
	role: UserRole
	confirmPassword: string
	phoneNumber: string
}

function Signup({ role }: { role: UserRole }) {
	const OAuthGoogleURL = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_URL ?? "#"
	const router = useRouter()
	const [values, setValues] = useState<State>({
		firstName: "",
		lastName: "",
		email: "",
		role: role,
		password: "",
		confirmPassword: "",
		phoneNumber: ""
	})

	const handleChange =
		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({ ...values, [prop]: event.target.value })
		}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (values.password !== values.confirmPassword) {
			toast.error("Passwords do not match")
			return
		}
		fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values)
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success(data.message)
					router.push("/signin")
				} else {
					toast.error(data.message)
				}
			})
			.catch(error => {
				toast.error(error.message)
			})
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
					Sign up your account
				</h2>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium leading-6 text-black"
								>
									First Name
								</label>
								<div className="mt-2">
									<input
										id="firstName"
										name="firstName"
										type="text"
										autoComplete="firstName"
										onChange={handleChange("firstName")}
										required
										className="block w-full rounded-md border-0 py-1.5 pl-2 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium leading-6 text-black"
								>
									Last Name
								</label>
								<div className="mt-2">
									<input
										id="lastName"
										name="lastName"
										type="text"
										autoComplete="lastName"
										onChange={handleChange("lastName")}
										required
										className="block w-full rounded-md border-0 py-1.5 pl-2 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>
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
										className="block w-full rounded-md border-0 py-1.5 pl-2 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="phoneNumber"
									className="block text-sm font-medium leading-6 text-black"
								>
									Phone Number
								</label>
								<div className="mt-2 mb-8">
									<input
										id="phoneNumber"
										name="phoneNumber"
										type="text"
										autoComplete="new-password"
										onChange={handleChange("phoneNumber")}
										required
										className="block w-full rounded-md border-0 py-1.5 pl-2 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
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
										name="password"
										type="password"
										autoComplete="new-password"
										onChange={handleChange("password")}
										required
										className="block w-full rounded-md border-0 py-1.5 pl-2 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium leading-6 text-black"
								>
									Confirm Password
								</label>
								<div className="mt-2 mb-8">
									<input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										autoComplete="new-password"
										onChange={handleChange(
											"confirmPassword"
										)}
										required
										className="block w-full rounded-md border-0 py-1.5 pl-2 bg-slate-100 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
									/>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
								>
									Sign up
								</button>
							</div>
						</form>
						<div>
							<div className="relative mt-8">
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
							<div className="mt-6 mb-4 grid grid-cols-1 gap-4">
								<a
									href={OAuthGoogleURL}
									className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
								>
									<FcGoogle className="h-5 w-5" />
									<span className="text-sm font-semibold leading-6 text-black">
										Google
									</span>
								</a>
							</div>
							<Link
								href="/signin"
								className="cursor-pointer text-sm font-semibold text-black hover:text-slate-700"
							>
								Already have an account? Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Signup
