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

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Example dashboard app built using the components."
}

export default function DashboardPage() {
	const data = [
		{
			name: "Jan",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Feb",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Mar",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Apr",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "May",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Jun",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Jul",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Aug",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Sep",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Oct",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Nov",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
		},
		{
			name: "Dec",
			total: Math.floor(Math.random() * 5000) + 1000,
			sales: Math.floor(Math.random() * 5000) + 1000
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

	return (
		<main className="min-h-[calc(100vh-192px)]">
			<div className="flex-col flex">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="flex items-center justify-between space-y-2">
						<h2 className="text-3xl font-bold tracking-tight">
							Dashboard
						</h2>
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
											You made{" "}
											{data[data.length - 1].sales} sales
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
											<Link href={tour.link}>
												View Details
											</Link>
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
