"use client"
import { useAtomValue } from "jotai"
import { Button } from "./ui/button"
import { SearchAtom } from "@/utils/atoms"
import { useEffect } from "react"

export const Trips = ({ tours }: { tours: any }) => {
	return (
		<div className="w-full flex flex-col gap-4">
			<h3 className="text-start text-2xl">Search Results</h3>
			<div className="gap-2 flex flex-col">
				{tours.map((tour: any, index: number) => (
					<div className="min-h-56 bg-secondary w-full rounded-lg p-4 flex lg:flex-row flex-col gap-2 justify-center lg:items-center items-start">
						<div className="lg:w-1/6 h-full justify-start lg:justify-center items-center flex lg:flex-col gap-4">
							<div className="h-20 rounded-full aspect-square bg-primary"></div>
							<h1 className="text-2xl font-semibold ">{tour.title}</h1>
						</div>
						<div className="flex flex-row h-full justify-between lg:justify-center items-center gap-10 lg:w-4/6">
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-semibold">
									{`${tour.arrival}`}
								</h3>
								<h2>{`${tour.arrival}`}</h2>
							</div>
							<div className="border border-primary w-64"></div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-semibold">
									{`${tour.departure}`}
								</h3>
								<h2>{`${tour.departure}`}</h2>
							</div>
						</div>
						<div className="flex lg:flex-col flex-row lg:w-1/6 lg:justify-center justify-start items-end gap-4">
							<div>
								<h2 className="text-2xl font-semibold">Total Amount</h2>
								<h3 className="text-lg">Rs. {tour.totalAmount}</h3>
							</div>
							<Button>View Details</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
