interface CardsProps {
	title: String
	subscript: String
	description: String
}

const Card = ({ title, subscript, description }: CardsProps) => {
	return (
		<div className="lg:w-[22rem] h-[10rem] lg:h-[22rem] rounded-3xl bg-black flex items-center justify-around lg:justify-center lg:items-start lg:flex-col pl-8">
			<div>
				<h1 className=" text-5xl lg:text-7xl text-white font-semibold mb-4">
					{title || "140K +"}
				</h1>
				<h1 className="text-2xl text-white lg:mb-8">
					{subscript || "Pilgrims annually"}
				</h1>
			</div>
			<h1 className="text-xl lg:text-lg w-2/3 text-white">
				{description ||
					"Thousand have entrusted us to fulfill their hajj aspirations"}
			</h1>
		</div>
	)
}

export default Card
