"use client"
import { Provider } from "jotai"
import { ThemeProvider } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class">
			<Provider>{children}</Provider>
		</ThemeProvider>
	)
}
