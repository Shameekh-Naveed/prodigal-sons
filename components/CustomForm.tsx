"use client"
import { useState } from "react"
import { Button } from "./ui/button"

type State = {
	location: string
	description: string
	departure: string
	arrival: string
	itinerary: {
		title: string
		description: string
		day: number
		nightStay: string
	}[]
}

export default function CustomForm() {
	const [values, setValues] = useState<State>({
		location: "",
		description: "",
		departure: "",
		arrival: "",
		itinerary: [{ title: "", description: "", day: 0, nightStay: "" }]
	})

	const addItienary = () => {
		setValues({
			...values,
			itinerary: [
				...values.itinerary,
				{ title: "", description: "", day: 0, nightStay: "" }
			]
		})
	}

	const handleChangeItinerary =
		(index: number) =>
		(prop: any) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const newItinerary = values.itinerary.map((itinerary, i) => {
				if (index !== i) return itinerary
				return { ...itinerary, [prop]: event.target.value }
			})
			setValues({ ...values, itinerary: newItinerary })
		}

	const handleChange =
		(prop: keyof State) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValues({ ...values, [prop]: event.target.value })
		}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {}

	return (
		<form className="flex flex-col gap-4 max-w-3xl" onSubmit={handleSubmit}>
			<label className="text-lg" htmlFor="location">
				Location
			</label>
			<input
				className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
				type="text"
				value={values.location}
				onChange={handleChange("location")}
				placeholder="Location"
			/>
			<label className="text-lg" htmlFor="description">
				Description
			</label>

			<textarea
				className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
				value={values.description}
				onChange={handleChange("description")}
				placeholder="Description"
			/>
			<label className="text-lg" htmlFor="departure">
				Departure
			</label>
			<input
				className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
				type="date"
				value={values.departure}
				onChange={handleChange("departure")}
				placeholder="Departure"
			/>
			<label className="text-lg" htmlFor="arrival">
				Arrival
			</label>
			<input
				className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
				type="date"
				value={values.arrival}
				onChange={handleChange("arrival")}
				placeholder="Arrival"
			/>
			{values.itinerary.map((itinerary, index) => (
				<div key={index} className="flex flex-col gap-4">
					<h3 className="text-2xl">Event {index + 1}</h3>
					<label className="text-lg" htmlFor="title">
						Title
					</label>
					<input
						className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
						type="text"
						value={itinerary.title}
						onChange={handleChangeItinerary(index)("title")}
						placeholder="Title"
					/>
					<label className="text-lg" htmlFor="description">
						Description
					</label>
					<textarea
						className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
						value={itinerary.description}
						onChange={handleChangeItinerary(index)("description")}
						placeholder="Description"
					/>
					<label className="text-lg" htmlFor="day">
						Day
					</label>
					<input
						className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
						type="number"
						value={itinerary.day}
						onChange={handleChangeItinerary(index)("day")}
						placeholder="Day"
					/>
					<label className="text-lg" htmlFor="nightStay">
						Night Stay
					</label>
					<input
						className="block w-full rounded-md border-0 py-1.5 bg-secondary text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-2"
						type="text"
						value={itinerary.nightStay}
						onChange={handleChangeItinerary(index)("nightStay")}
						placeholder="Night Stay"
					/>
				</div>
			))}
			<div className="flex flex-col gap-2">
				<div>
					<Button
						type="button"
						className="h-fit"
						onClick={() => addItienary()}
					>
						Add a trip event
					</Button>
				</div>
				<div>
					<Button type="submit" className="h-fit">
						Send Request for A Custom Trip
					</Button>
				</div>
			</div>
		</form>
	)
}
