import Logo from "@/assets/logo.png"
import Image from "next/image"
import ServiceCard from "./ServiceCard"
import { FaHotel } from "react-icons/fa6"
import { FaPlane } from "react-icons/fa"
import { FaSquarePhone } from "react-icons/fa6"
import { LuTarget } from "react-icons/lu"
const Services = () => {
	return (
		<div className="min-h-[80vh] flex items-center gap-8 bg-gray-50">
			<div className=" hidden min-[1350px]:block min-[1350px]:w-[50%]">
				<Image src={Logo} alt="Ka'aba" width={1000} height={1000} />
			</div>
			<div className="flex flex-col">
				<h2 className="mx-12 min-[1350px]:mx-0 text-5xl 2xl:text-6xl font-bold text-gray-800  mb-4 text-center min-[1350px]:text-start">
					Services we Provide
				</h2>
				<p className="mx-12 min-[1350px]:mx-0 text-xl text-black mb-24 text-center min-[1350px]:text-start">
					We provide a range of services to make your journey
					comfortable and spiritual
				</p>
				<div className="flex flex-wrap gap-6 justify-center min-[1350px]:justify-start">
					<ServiceCard
						title={"Best Hotels"}
						icon={<FaHotel />}
						description={
							"We provide the best hotels for your stay during your journey to the holy places of Islam "
						}
					/>
					<ServiceCard
						title={"Easy Transfer"}
						icon={<FaPlane />}
						description={
							"Transfer from one place to another is made easy with our services. We provide the best transportation services for your journey "
						}
					/>
					<ServiceCard
						title={"Best Services"}
						icon={<FaSquarePhone />}
						description={
							"We provide the best services for your stay during your journey to the holy places of Islam"
						}
					/>
					<ServiceCard
						title={"24/7 Support"}
						icon={<LuTarget />}
						description={
							"We provide 24/7 support for your queries and concerns during your journey"
						}
					/>
				</div>
			</div>
		</div>
	)
}
export default Services
