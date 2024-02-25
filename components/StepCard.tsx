interface StepCardProps {
	step: string
	name: string
	method: string
}

const StepCard = ({ step, name, method }: StepCardProps) => {
	return (
		<div className="w-[23rem] h-[16rem] rounded-3xl bg-white border border-gray-500 flex flex-col justify-center relative text-center items-center">
			<div className="w-32 h-12 bg-white rounded-full absolute left-30 bottom-[14.5rem] border-purple-600 border-2">
				<h1 className="text-xl text-purple-600  flex justify-center items-center h-full">
					{step || "Step 1"}
				</h1>
			</div>
			<h1 className="text-2xl text-black font-semibold mb-4">{name || "Tawaf"}</h1>
			<h1 className="text-lg w-2/3 text-black">
				{method ||
					"Circumambulate the Kaaba seven times, in an anti-clockwise direction"}
			</h1>
		</div>
	)
}
export default StepCard
