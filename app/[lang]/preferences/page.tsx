"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"

const Preferences = () => {
	const router = useRouter()

	const [travelStyle, setTravelStyle] = useState([] as string[])
	const [travelSites, setTravelSites] = useState([] as string[])

	const handleTravelStyle = (e: any) => {
		setTravelStyle([...travelStyle, e.target.value])
		console.log(travelStyle)
	}

	const handleTravelSites = (e: any) => {
		setTravelSites([...travelSites, e.target.value])
		console.log(travelSites)
	}

	const savePreferences = async (e: any) => {
		e.preventDefault()
		const data = [...travelStyle, ...travelSites]
		console.log({ data })
		try {
			const res = await fetch("/api/user/preferences", {
				method: "POST",
				body: JSON.stringify(data)
			})

			const parsedRes = await res.json()
			if (!res.ok) {
				toast.error(parsedRes.message)
				toast.error(parsedRes.error)
			} else {
				toast.success(parsedRes.message)
				router.push("/")
			}
		} catch (error) {
			toast.error("Internal server error. Please try again later")
		}
	}

	// useEffect(() => {
	// 	console.log(travelStyle)
	// }, [travelStyle])

	// useEffect(() => {
	// 	console.log(travelSites)
	// }, [travelSites])

	return (
		<main className="flex min-h-[calc(100vh-192px)] justify-end bg-secondary flex-col 2xl:flex-row">
			<div className="my-auto text-center px-8 min-h-32 justify-center items-center flex">
				<h1 className="text-primary text-4xl 2xl:text-5xl font-semibold ">
					Let's start your travel journey
				</h1>
			</div>
			<div className="w-full bg-primary rounded-t-3xl 2xl:rounded-tr-none  2xl:rounded-tl-3xl 2xl:rounded-bl-xl flex flex-col justify-center items-center 2xl:w-[70%] py-24">
				<h1 className="text-4xl font-bold mb-6 text-secondary">
					Select your preferred travel style
				</h1>
				<div className="flex flex-col w-[80%] my-8">
					<h1 className="text-xl my-6 text-secondary">
						Select your preferred travel style
					</h1>
					<ul className="flex flex-wrap gap-6 justify-start 2xl:justify-center">
						<li className="">
							<input
								type="checkbox"
								id="premium"
								name="travelStyle"
								value="premium"
								className="hidden peer"
								onChange={e => {
									handleTravelStyle(e)
								}}
							/>
							<label
								htmlFor="premium"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block ">
									<div className="w-full text-lg font-semibold">
										Premium
									</div>
									<div className="w-full text-sm">
										A premium experience for your journey.
									</div>
								</div>
							</label>
						</li>
						<li className="">
							<input
								type="checkbox"
								id="budget"
								value="budget"
								name="travelStyle"
								className="hidden peer"
								onChange={e => {
									handleTravelStyle(e)
								}}
							/>
							<label
								htmlFor="budget"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Budget
									</div>
									<div className="w-full text-sm">
										A budget experience for your journey.
									</div>
								</div>
							</label>
						</li>
					</ul>
				</div>
				<div className="flex flex-col w-[80%]">
					<h1 className="text-xl mb-6 text-secondary">
						Select your preferred travelling sites
					</h1>
					<ul className="flex w-full gap-6 flex-wrap justify-start 2xl:justify-center">
						<li className="">
							<input
								type="checkbox"
								id="cultural"
								value=""
								name="travelSites"
								className="hidden peer"
								onChange={e => {
									handleTravelSites(e)
								}}
							/>
							<label
								htmlFor="cultural"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500 "
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Cultural Tourism
									</div>
								</div>
							</label>
						</li>
						<li className="">
							<input
								type="checkbox"
								id="historical"
								value=""
								name="travelSites"
								onChange={e => {
									handleTravelSites(e)
								}}
								className="hidden peer"
							/>
							<label
								htmlFor="historical"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Historical Tourism
									</div>
								</div>
							</label>
						</li>

						<li className="">
							<input
								type="checkbox"
								id="mountain"
								value=""
								className="hidden peer"
								name="travelSites"
								onChange={e => {
									handleTravelSites(e)
								}}
							/>
							<label
								htmlFor="mountain"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Mountain Tourism
									</div>
								</div>
							</label>
						</li>
						<li className="">
							<input
								type="checkbox"
								id="ecotourism"
								value=""
								className="hidden peer"
								name="travelSites"
								onChange={e => {
									handleTravelSites(e)
								}}
							/>
							<label
								htmlFor="ecotourism"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										EcoTourism
									</div>
								</div>
							</label>
						</li>
						<li className="">
							<input
								type="checkbox"
								id="religious"
								value=""
								className="hidden peer"
								name="travelSites"
								onChange={e => {
									handleTravelSites(e)
								}}
							/>
							<label
								htmlFor="religious"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Religious Tourism
									</div>
								</div>
							</label>
						</li>
						<li className="">
							<input
								type="checkbox"
								id="wildlife"
								value=""
								className="hidden peer"
								name="travelSites"
								onChange={e => {
									handleTravelSites(e)
								}}
							/>
							<label
								htmlFor="wildlife"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Wildlife Tourism
									</div>
								</div>
							</label>
						</li>
						<li className="">
							<input
								type="checkbox"
								id="desert"
								value=""
								className="hidden peer"
								name="travelSites"
								onChange={e => {
									handleTravelSites(e)
								}}
							/>
							<label
								htmlFor="desert"
								className="inline-flex items-center justify-between w-full p-4 text-primary bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:text-blue-500 peer-checked:text-blue-500 hover:bg-gray-50  dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-blue-500"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Desert Tourism
									</div>
								</div>
							</label>
						</li>
					</ul>
				</div>
				<div className="w-full flex justify-end items-center mt-10 mr-20">
					<Button
						className="bg-secondary hover:border hover:border-secondary w-34 h-12 font-semibold text-primary hover:text-blue-500"
						onClick={savePreferences}
					>
						Continue
					</Button>
				</div>
			</div>
		</main>
	)
}

export default Preferences
