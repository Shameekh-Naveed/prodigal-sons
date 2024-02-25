"use client"
import { Metadata } from "next"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Overview } from "./components/overview"
import { RecentSales } from "./components/recent-sales"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TourCategory } from "@/app/enums/tour.enum"
import { redirect } from "next/navigation"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"
import { useEffect } from "react"
import { getSession } from "next-auth/react"

export default function DashboardPage() {
	const session = getSession()
	if (!session) {
		redirect("/signin")
	}

	const data = [
		{
			name: "Jan",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Feb",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Mar",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Apr",
			total: 124728,
			sales: 3423509
		},
		{
			name: "May",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Jun",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Jul",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Aug",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Sep",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Oct",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Nov",
			total: 124728,
			sales: 3423509
		},
		{
			name: "Dec",
			total: 124728,
			sales: 3423509
		}
	]

	const requests = [
		{
			name: "Shadcn",
			link: "/tours/1"
		},
		{
			name: "Shadcn",
			link: "/tours/1"
		},
		{
			name: "Shadcn",
			link: "/tours/1"
		},
		{
			name: "Shadcn",
			link: "/tours/1"
		}
	]

	useEffect(() => {}, [])
	// const { registerations, revenue, registerationsArr } = await fetchStats()
	// const request = await fetchReservations()

	return (
		<main className="min-h-[calc(100vh-192px)]">
			<div className="flex-col flex">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="flex items-center justify-between space-y-2">
						<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					</div>
					<Tabs defaultValue="overview" className="space-y-4">
						<TabsContent value="overview" className="space-y-4">
							<div className="flex flex-row gap-4 w-full">
								<Card className="w-full">
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Total Revenue
										</CardTitle>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="h-4 w-4 text-muted-foreground"
										>
											<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
										</svg>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											Rs. {data[data.length - 1].total}
										</div>
										<p className="text-xs text-muted-foreground">
											{((data[data.length - 1].total -
												data[data.length - 2].total) /
												data[data.length - 2].total) *
												100}{" "}
											% from last month
										</p>
									</CardContent>
								</Card>
								<Card className="w-full">
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">
											Sales
										</CardTitle>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="h-4 w-4 text-muted-foreground"
										>
											<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
											<circle cx="9" cy="7" r="4" />
											<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
										</svg>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">
											{data[data.length - 1].sales}
										</div>
										<p className="text-xs text-muted-foreground">
											{((data[data.length - 1].sales -
												data[data.length - 2].sales) /
												data[data.length - 2].sales) *
												100}{" "}
											% from last month
										</p>
									</CardContent>
								</Card>
							</div>
							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
								<Card className="col-span-4">
									<CardHeader>
										<CardTitle>Overview</CardTitle>
									</CardHeader>
									<CardContent className="pl-2">
										<Overview data={data} />
									</CardContent>
								</Card>
								<Card className="col-span-3">
									<CardHeader>
										<CardTitle>Recent Sales</CardTitle>
										<CardDescription>
											You made {data[data.length - 1].sales} sales
											in the last month
										</CardDescription>
									</CardHeader>
									<CardContent>
										<RecentSales />
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
					<Card>
						{/* a card componenet for seeing what the user has requested over some time */}
						<CardHeader>
							<CardTitle>Recent Requests</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							{requests.map((tour, index) => (
								<div className="flex flex-col space-y-4">
									<div className="flex flex-row justify-between items-center">
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium leading-none">
												{tour.name}
											</p>
											<p className="text-xs leading-none text-muted-foreground"></p>
										</div>
										<Button className="font-medium">
											<Link href={tour.link}>View Details</Link>
										</Button>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	)
}

// TODO: Test this
const fetchReservations = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_HOST}api/dashboard/registerations`
		)
		const parsedRes = await res.json()
		console.log({ parsedRes })
		const data = parsedRes.data.registerations
		console.log({ data })
		return data
	} catch (error) {
		console.log({ error })
		return []
	}
}

// TODO: Test this
const fetchStats = async () => {
	console.log("process.env.NEXT_PUBLIC_HOST", process.env.NEXT_PUBLIC_HOST)
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/dashboard/stats`, {
			cache: "no-cache"
		})
		const parsedRes = await res.json()
		if (!res.ok) return { a: 1, b: 2, c: 3 }
		console.log({ parsedRes })
		const data = parsedRes.data.stats
		return data
	} catch (error) {
		console.log({ error })
		const a = 1
		return { a, b: a, c: a }
	}
}
