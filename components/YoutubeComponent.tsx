"use client"
import React from "react"
import YouTube, { YouTubeProps } from "react-youtube"

export default function YoutubeComponent() {
	const onPlayerReady: YouTubeProps["onReady"] = event => {
		event.target.pauseVideo()
	}

	const opts: YouTubeProps["opts"] = {
		playerVars: {
			autoplay: 1
		}
	}

	return (
		<div className="w-full flex flex-col justify-center items-center py-12 gap-10">
			<h2 className="text-5xl md:text-6xl 2xl:text-7xl font-bold text-center text-black mt-24 mb-4">
				Pilgirms at Ka'aba
			</h2>
			<YouTube
				iframeClassName="aspect-[16/9] 2xl:w-[80rem] 2xl:h-[50rem] xl:w-[60rem] xl:h-[40rem] lg:w-[50rem] lg:h-[30rem] md:h-[30rem] w-[30rem] h-[20rem] "
				videoId="9QhGZi113xg"
				opts={opts}
				onReady={onPlayerReady}
			/>
		</div>
	)
}
