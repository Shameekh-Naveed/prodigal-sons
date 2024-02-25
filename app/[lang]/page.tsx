import React from "react"
import Carousel from "@/components/CarouselHome"
import { Command, CommandInput } from "@/components/ui/command"
import Image from "next/image"
import Desktop from "@/assets/desktop.png"
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionaries"
import { Button } from "@/components/ui/button"
import Places from "@/components/Places"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/auth"

const Home = async ({ params }: { params: { lang: Locale } }) => {
	const { home } = await getDictionary(params.lang)

	return (
		<main className="min-h-[calc(100vh-192px)] py-12">
			<div className="container text-center lg:mb-12 my-8">
				<p className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
					{home.banner.headline}{" "}
				</p>
			</div>
			<div className="container mx-auto flex justify-center">
				<Command className=" border border-primary rounded-full w-[50rem] h-[4rem] mb-20 drop-shadow-lg">
					<CommandInput
						placeholder="Type a command or search..."
						className="w-[50rem] h-[4rem] text-xl"
					/>
				</Command>
			</div>
			<div className="container mx-auto flex justify-center">
				<div className="w-full bg-gradient-to-br dark:from-[#a674a1] from-[#fad0c4] to-[#ffd1ff] 2xl:h-[35rem] rounded-2xl flex flex-col 2xl:flex-row">
					<div className=" w-full 2xl:w-1/2 justify-center items-center flex flex-col ">
						<h1 className=" sm:text-4xl 2xl:text-5xl max-2xl:text-center font-bold text-primary w-2/3 my-16">
							Plan your trip now.
						</h1>
						<h1 className="sm:text-2xl 2xl:text-2xl max-2xl:text-center font-bold text-primary w-2/3 mb-8">
							Get a personalized itinerary just for you, guided by traveler
							tips and reviews.
						</h1>
					</div>
					<div className="w-full 2xl:w-1/2 flex items-center mb-16 justify-center">
						<div className=" w-[60%] 2xl:w-full">
							<div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
								<div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
									<Image
										src={Desktop}
										className="h-[156px] md:h-[278px] w-full rounded-xl"
										alt=""
									/>
								</div>
							</div>
							<div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
								<div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="lg:h-100 lg:mx-24 lg:my-16">
				<div className="lg:mb-12 my-8 flex justify-center">
					<div className="w-[70%]">
						<p className="text-3xl md:text-3xl lg:text-4xl font-bold">
							Our top packages
						</p>
					</div>
				</div>
				<Carousel />
			</div>

			<div className="lg:h-100 lg:mx-24 lg:my-16">
				<div className="lg:mb-12 my-8 flex justify-center">
					<div className="w-[70%]">
						<p className="text-3xl md:text-3xl lg:text-4xl font-bold">
							Most popular destinations
						</p>
					</div>
				</div>
				<Places />
			</div>
			<div className="container mx-auto flex justify-center">
				<div
					className="h-[15rem] rounded-2xl flex bg-cover bg-bottom relative w-full"
					style={{
						backgroundImage:
							"url('https://businessschool.luiss.it/tourism-management/wp-content/uploads/sites/4/2023/06/shutterstock_1774042925-scaled-e1686324435575.jpg')"
					}}
				>
					<div className="absolute w-full h-full bg-black opacity-10 rounded-2xl"></div>

					<div className="flex flex-col justify-center w-2/3 z-20">
						<h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-primary w-2/3 mb-8 pl-8">
							Plan your trip now.
						</h1>
						<h1 className="text-sm md:text-xl lg:text-xl font-bold text-primary w-2/3 pl-8">
							Get a personalized itinerary just for you, guided by traveler
							tips and reviews.
						</h1>
					</div>
					<div className="flex justify-end items-end w-1/3 z-20 md:pr-8">
						<Button className="bg-secondary text-primary hover:text-secondary px-4 py-2 w-30 font-bold mb-6 rounded-full">
							<Link href={"/en/tours/custom"}>Design custom trip</Link>
						</Button>
					</div>
				</div>
			</div>
			<div className="container mx-auto flex justify-center">
				<div
					className="h-[35rem] rounded-2xl flex flex-col my-24 bg-cover bg-center justify-end relative w-full"
					style={{
						backgroundImage:
							"url('https://wallpapers.com/images/featured/kaaba-a2wif1x8on9qihxv.jpg')"
					}}
				>
					<div className="absolute w-full h-full bg-black opacity-30"></div>
					<h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-white mb-4 z-10 pl-8">
						Checkout our Hajj and Umrah packages
					</h1>
					<h1 className="text-lg md:text-xl lg:text-xl font-bold text-white mb-4 z-10 pl-8">
						We have a wide range of religious packages to suit all tastes.
					</h1>
					<div className="w-30 z-10 pl-8">
						<Button className="bg-secondary text-primary hover:text-secondary px-4 py-2 w-30 font-bold mb-6 rounded-full">
							<Link href={"/en/quwa"}>Explore Quwa</Link>
						</Button>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Home
