import React from "react"
import { Separator } from "./ui/separator"

const Perks = () => {
	return (
		<div className="bg-base-100 text-base-content container">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
					<div className="lg:w-[20rem] lg:h-[10rem] flex flex-col justify-center items-center">
						<h2 className="text-xl lg:text-2xl font-bold">
							Free Shipping
						</h2>
						<p className="text-lg">
							Free shipping on all orders over $100
						</p>
					</div>

					<div className="lg:w-[20rem] lg:h-[10rem] flex flex-col justify-center items-center">
						<h2 className="text-xl lg:text-2xl font-bold">
							Secure Payment
						</h2>
						<p className="text-lg">
							We offer safe shopping guarantee
						</p>
					</div>
					<div className="lg:w-[20rem] lg:h-[10rem] flex flex-col justify-center items-center">
						<h2 className="text-xl lg:text-2xl font-bold">
							24/7 Support
						</h2>
						<p className="text-lg">
							We offer 24/7 customer support
						</p>
					</div>
					<div className="lg:w-[22rem] lg:h-[10rem] flex flex-col justify-center items-center">
						<h2 className="text-xl lg:text-2xl font-bold">
							Money Back Guarantee
						</h2>
						<p className="text-lg">
							We offer 30 day money back guarantee
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Perks
