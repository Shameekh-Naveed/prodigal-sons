import Link from "next/link"

export default function Footer({ footer }: { footer: any }) {
	const { links, socials } = footer

	return (
		<footer className="bg-secondary w-full flex">
			<div className="container flex flex-col justify-center items-center h-24 mx-auto">
				<div className="flex justify-center items-center">
					{links.map((link: any, index: number) => (
						<Link key={index} href={link.href} className="mx-2">
							{link.label}
						</Link>
					))}
				</div>
				<p>&copy; {new Date().getFullYear()} the website</p>
			</div>
		</footer>
	)
}
