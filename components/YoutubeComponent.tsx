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
				iframeClassName="aspect-[16/9] 2xl:h-[50rem] xl:h-[30rem] lg:h-[25rem] md:h-[20rem] sm:h-[15rem] h-[12rem]"
				videoId="9QhGZi113xg"
				opts={opts}
				onReady={onPlayerReady}
			/>
		</div>
	)
}
