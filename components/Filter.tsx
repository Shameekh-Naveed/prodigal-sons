"use client"
import { TripSort } from "@/app/enums/filterParams.enum"
import { Button } from "./ui/button"
import { Command, CommandInput } from "./ui/command"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { TourCategory } from "@/app/enums/tour.enum"
import { useState } from "react"
import { useSetAtom } from "jotai"
import { SearchAtom } from "@/utils/atoms"

type State = {
	command: string
	category: string
	sort: string
}

export default function Filter() {
	const [values, setValues] = useState<State>({
		command: "",
		category: "",
		sort: ""
	})
	const setSearchAtom = useSetAtom(SearchAtom)

	const handleChange = (prop: keyof State) => (event: any) => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleValueChange = (prop: keyof State) => (value: any) => {
		setValues({ ...values, [prop]: value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(values)
		setSearchAtom(values)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full h-24 rounded-lg flex justify-between items-center px-8"
		>
			<div>
				<div className="flex flex-row gap-2 justify-center items-center">
					<Command className="border border-primary w-[20rem] h-12 drop-shadow-lg">
						<CommandInput
							placeholder="Type a command or search..."
							className="w-[50rem] h-12"
							onChangeCapture={handleChange("command")}
						/>
					</Command>
					<div>
						<Select onValueChange={handleValueChange("category")}>
							<SelectTrigger className="w-[180px] capitalize">
								<SelectValue
									placeholder="Category"
									className="capitalize"
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value={TourCategory.RELEGIOUS}
									className="capitalize"
								>
									{TourCategory.RELEGIOUS}
								</SelectItem>
								<SelectItem
									className="capitalize"
									value={TourCategory.CULTURAL}
								>
									{TourCategory.CULTURAL}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<Select onValueChange={handleValueChange("sort")}>
							<SelectTrigger className="w-[180px] capitalize">
								<SelectValue placeholder="Sort" className="capitalize" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									className="capitalize"
									value={TripSort.PRICE_ASC}
								>
									{TripSort.PRICE_ASC}
								</SelectItem>
								<SelectItem
									className="capitalize"
									value={TripSort.PRICE_DEC}
								>
									{TripSort.PRICE_DEC}
								</SelectItem>
								<SelectItem
									className="capitalize"
									value={TripSort.DEPARTURE_ASC}
								>
									{TripSort.DEPARTURE_ASC}
								</SelectItem>
								<SelectItem
									className="capitalize"
									value={TripSort.DEPARTURE_DEC}
								>
									{TripSort.DEPARTURE_DEC}
								</SelectItem>
								<SelectItem
									className="capitalize"
									value={TripSort.CREATED_DEC}
								>
									{TripSort.CREATED_DEC}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			<Button type="submit">Search</Button>
		</form>
	)
}
