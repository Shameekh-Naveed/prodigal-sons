"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ReactStars from "react-rating-stars-component"

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetClose,
	SheetTrigger
} from "@/components/ui/sheet"

interface TripsProps {
	Title: string
	departure: string
	arrival: string
	price: string
}

const Trips = ({ Title, departure, arrival, price }: TripsProps) => {
	return (
		<div className="min-h-48 bg-secondary w-full rounded-lg p-4 flex lg:flex-row flex-col gap-2 justify-center lg:items-center items-start">
			<div className="lg:w-1/6 h-full justify-start lg:justify-center items-center flex lg:flex-col gap-4">
				<div className="h-20 rounded-full aspect-square bg-primary"></div>
				<h1 className="text-2xl font-semibold ">{Title || "Title"}</h1>
			</div>
			<div className="flex flex-row h-full justify-between lg:justify-center items-center gap-10 lg:w-4/6">
				<div className="flex flex-col gap-2">
					<h3 className="text-2xl font-semibold">Departure</h3>
					<h2>{departure || "10:00"}</h2>
				</div>
				<div className="border border-primary w-32 md:w-64"></div>
				<div className="flex flex-col gap-2 mr-4">
					<h3 className="text-2xl font-semibold">Arrival</h3>
					<h2>{arrival || "2:00"}</h2>
				</div>
			</div>
			<div className="flex lg:flex-col flex-row lg:w-1/6 lg:justify-center justify-start items-end gap-4 mt-4">
				<div>
					<h2 className="text-2xl font-semibold pr-5">price</h2>
					<h3 className="text-lg pr-5">Rs.{price || "1500"}</h3>
				</div>
				<Sheet key={"bottom"}>
					<SheetTrigger asChild>
						<Button>Write review</Button>
					</SheetTrigger>
					<SheetContent side={"bottom"}>
						<SheetHeader>
							<SheetTitle>Write Review</SheetTitle>
							<SheetDescription>
								Write review and provide ratings related to your
								trip
							</SheetDescription>
						</SheetHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Review
								</Label>
								<Textarea
									placeholder="Type your message here."
									className="w-[200%]"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label
									htmlFor="username"
									className="text-right"
								>
									Rating
								</Label>
								<ReactStars
									count={5}
									// onChange={ratingChanged}
									isHalf={true}
									size={24}
									activeColor="#ffd700"
								/>
							</div>
						</div>
						<SheetFooter>
							<SheetClose asChild>
								<Button type="submit">Save changes</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}
export default Trips
