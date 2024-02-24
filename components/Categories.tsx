import React from "react"
import { Button, buttonVariants } from "../components/ui/button"

const Categories = () => {
	return (
		<div className="h-full">
			<div className=" flex lg:h-1/2 ">
				<div className="h-full w-1/2 flex flex-col items-center max-[1024px]:w-full customCSS-categories2 relative">
					<div className="absolute w-full h-full bg-black opacity-50"></div>
					<div className="z-20 flex flex-col items-center">
						<div className="text-center">
							<p className="text-4xl font-bold text-white mt-24 mb-16 mx-8">
								Discover Our Extensive Game Library
							</p>
						</div>
						<p className="text-white text-xl lg:w-[70%] mb-8 mx-8">
							We have a wide range of games to suit all tastes.
							Whether you're a fan of action, adventure, or
							sports, we have something for you.Explore critically
							acclaimed titles from renowned developers, indie
							gems bursting with creativity, and nostalgic
							classics that will transport you back in time.
						</p>
						<div className="mb-12">
							<Button variant="secondary">Secondary</Button>
						</div>
					</div>
				</div>
				<div
					className="h-full w-1/2 bg-cover bg-center max-[1024px]:hidden "
					style={{
						backgroundImage:
							"url('https://insider-gaming.com/wp-content/uploads/2023/10/game-subscriptions.jpg')"
					}}
				></div>
			</div>
			<div className="flex lg:h-1/2 ">
				<div
					className="h-full w-1/2 bg-cover bg-center max-[1024px]:hidden"
					style={{
						backgroundImage:
							"url('https://media.wired.com/photos/627da1085d49787abdf713b4/16:9/w_2400,h_1350,c_limit/Pakistani-Gamers-Want-a-Seat-at-the-Table-Culture-shutterstock_1949862841.jpg')"
					}}
				></div>
				<div className="h-full w-1/2 flex flex-col items-center max-[1024px]:w-full customCSS-categories1 relative">
					<div className="absolute w-full h-full bg-black opacity-50"></div>
					<div className="z-20 flex flex-col items-center">
						<div className="text-center">
							<p className="text-4xl font-bold text-white mt-24 mb-16 mx-8">
								Discover Our Extensive Game Library
							</p>
						</div>
						<p className="text-white text-xl lg:w-[70%] mb-8 mx-8">
							We have a wide range of games to suit all tastes.
							Whether you're a fan of action, adventure, or
							sports, we have something for you.Explore critically
							acclaimed titles from renowned developers, indie
							gems bursting with creativity, and nostalgic
							classics that will transport you back in time.
						</p>
						<div className="mb-12">
							<Button variant="secondary">Secondary</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Categories
