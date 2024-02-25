import Image from "next/image"
import Kaaba from "@/assets/kaaba.png"
const Spots = () => {
	return (
		<div className="container min-h-[calc(100vh-6rem)] flex flex-col items-center gap-8 w-full bg-white">
			<h2 className="text-5xl md:text-6xl 2xl:text-7xl font-bold text-center text-black mt-24 mb-4">
				Holy places of Ka'aba to visit
			</h2>
			<p className="text-xl text-black  flex w-2/3 text-center justify-center leading-9">
				Visit the sacred places of Islam, and experience the spiritual
				journey
			</p>
			<Image src={Kaaba} alt="Ka'aba" width={1000} height={1000} />
		</div>
	)
}
export default Spots
