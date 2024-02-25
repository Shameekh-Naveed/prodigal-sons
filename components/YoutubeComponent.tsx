"use client"
import React from "react"
import YouTube, { YouTubeProps } from "react-youtube"

export default function YoutubeComponent() {
	const onPlayerReady: YouTubeProps["onReady"] = event => {
		event.target.pauseVideo()
	}

	const opts: YouTubeProps["opts"] = {
		height: "720",
		width: "1280",
		playerVars: {
			autoplay: 1
		}
	}

	return (
		<div className="w-full flex flex-col justify-center items-center py-12 gap-10">
			<h2 className="text-5xl md:text-6xl 2xl:text-7xl font-bold text-center text-black mt-24 mb-4">
				Pilgirms at Ka'aba
			</h2>
			<YouTube videoId="Rl8a0wQePCo" opts={opts} onReady={onPlayerReady} />
		</div>
	)
}
