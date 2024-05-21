"use client"
import React, { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

export default function MapsComponent() {
	const mapRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		const initMap = async () => {
			const loader = new Loader({
				apiKey: "",
				version: "weekly"
			})
			const { Map } = await loader.importLibrary("maps")
			const map = new Map(mapRef?.current!, {
				center: { lat: 21.4225, lng: 39.8262 },
				zoom: 8
			})
			const marker = new google.maps.Marker({
				position: { lat: 21.4225, lng: 39.8262 },
				map: map,
				title: "Holy Kaaba"
			})
		}
		initMap()
	}, [])
	return <div className="h-[40rem] w-full" ref={mapRef} />
}
