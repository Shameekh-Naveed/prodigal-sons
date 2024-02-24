import StepCard from "./StepCard"
const Steps = () => {
	return (
		<div className="container min-h-[calc(100vh-6rem)] flex flex-col items-center gap-8 w-full bg-white">
			<h2 className=" text-5xl md:text-6xl 2xl:text-7xl font-bold text-center text-black mt-24 mb-4">
				Steps for Hajj Pilgrimage
			</h2>
			<p className="text-xl text-gray-600  flex w-2/3 text-center justify-center leading-9">
				Perform Hajj following these steps, a sacred journey of devotion
			</p>
			<div className="flex flex-wrap gap-16 justify-center mt-16">
				<StepCard
					name={"Intention for Hajj"}
					step={"Step 01"}
					method={
						"Muslims commence their Hajj journey by declaring intention forthe sacred pilgrimage to Mecca, a profound act"
					}
				/>
				<StepCard
					name={"Ihram Before Miqat"}
					step={"Step 02"}
					method={
						"Ihram is the sacred state of purity and intention for Hajj, which is entered before reaching the Miqat boundary"
					}
				/>
				<StepCard
					name={"Tawaf-ul-Qudum"}
					step={"Step 03"}
					method={
						"Perform Tawaf around the Kaaba, the sacred structure at the center of the Masjid al-Haram in Mecca"
					}
				/>
				<StepCard
					name={"Safa and Marwah"}
					step={"Step 04"}
					method={
						"Perform Sa'i, walking seven times between the hills of Safa and Marwah, as Hagar did in search of water for her son Isma'il"
					}
				/>
				<StepCard
					name={"Clip/Shave Hair (Umrah Ends)"}
					step={"Step 05"}
					method={
						"Clip or shave hair, marking the end of the Umrah pilgrimage, and the beginning of the Hajj pilgrimage"
					}
				/>
				<StepCard
					name={"Resting and Praying"}
					step={"Step 06"}
					method={
						"Rest and pray in the Grand Mosque, and prepare for the next stage of Hajj"
					}
				/>
				<StepCard
					name={"Enter State of Ihram"}
					step={"Step 07"}
					method={
						"Enter the state of Ihram, and commence the journey to Mina, a small village near Mecca, to spend the night in prayer and reflection"
					}
				/>
				<StepCard
					name={"Arrive at Mina"}
					step={"Step 08"}
					method={
						"Arrive at Mina, and spend the day in prayer and reflection, and prepare for the next stage of Hajj"
					}
				/>
			</div>
		</div>
	)
}

export default Steps
