interface ServiceCardProps {
	title: string
	description: string
	icon: React.ReactNode
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
	return (
		<div className="flex flex-col justify-center p-8 rounded-lg w-[30rem] ">
			<div className="flex gap-4 items-center">
				<div className="p-3 rounded-full bg-primary-500">{icon}</div>
				<h3 className="text-2xl font-semibold text-center">{title}</h3>
			</div>
			<p className="mt-2 text-lg text-center text-gray-600">
				{description}
			</p>
		</div>
	)
}

export default ServiceCard
