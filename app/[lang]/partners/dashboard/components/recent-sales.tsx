import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
	const sales = [
		{
			name: "Olivia Martin",
			email: "olivia.martin@email.com"
		},
		{
			name: "Olivia Martin",
			email: "olivia.martin@email.com"
		},
		{
			name: "Olivia Martin",
			email: "olivia.martin@email.com"
		},
		{
			name: "Olivia Martin",
			email: "olivia.martin@email.com"
		},
		{
			name: "Olivia Martin",
			email: "olivia.martin@email.com"
		}
	]

	return (
		<div className="space-y-8">
			{sales.map(
				(sale: { name: string; email: string }, index: number) => (
					<div className="flex items-center">
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">
								{sale.name}
							</p>
							<p className="text-sm text-muted-foreground">
								{sale.email}
							</p>
						</div>
						<div className="ml-auto font-medium">+$1,999.00</div>
					</div>
				)
			)}
		</div>
	)
}
