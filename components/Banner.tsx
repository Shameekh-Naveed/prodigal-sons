"use client"
import React from "react"
import { Button } from "./ui/button"
import StatCard from "@/components/StatCard"

const Banner: React.FC = () => {
	return (
		<div
			className=" w-full bg-center bg-cover bg-no-repeat relative"
			style={{
				backgroundImage:
					"url('https://www.10wallpaper.com/wallpaper/1920x1080/1809/Islamic_mosque_white_building_photo_1920x1080.jpg')"
			}}
		>
			<div className="container min-h-[calc(100vh-6rem)] flex flex-col items-center gap-8 w-full">
				<h2 className=" text-5xl md:text-6xl 2xl:text-7xl font-bold text-center text-black mt-24">
					Embark on a Sacred Journey
				</h2>
				<h2 className=" text-5xl md:text-6xl 2xl:text-7xl font-bold text-center text-black">
					Experience Hajj and Umrah
				</h2>
				<p className="text-xl text-black  flex w-2/3 text-center justify-center leading-9">
					Discover Spiritual Fulfillment, Discover Yourself, and Find Peace in
					the Heart of Islam's Holiest Pilgrimages with Our Guided Tours
				</p>
				<Button
					className="bg-white text-black rounded-full text-lg"
					onClick={() => {}}
				>
					Get Started
				</Button>
				<div className="container flex flex-col lg:flex-row gap-10 justify-center mb-12">
					<StatCard
						title="40k +"
						subscript="Pilgrims annually"
						description="Thousand have entrusted us to fulfill their hajj aspirations"
					/>
					<StatCard
						title="40k +"
						subscript="Pilgrims annually"
						description="Thousand have entrusted us to fulfill their hajj aspirations"
					/>
					<StatCard
						title="40k +"
						subscript="Pilgrims annually"
						description="Thousand have entrusted us to fulfill their hajj aspirations"
					/>
				</div>
			</div>
		</div>
	)
}

export default Banner
