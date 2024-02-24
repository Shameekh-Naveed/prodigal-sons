const Preferences = () => {
	return (
		<main className="flex min-h-[calc(100vh-192px)] justify-end bg-primary">
			<div className="my-auto text-center px-8">
				<h1 className="text-white text-5xl font-semibold">
					Let's start your travel journey
				</h1>
			</div>
			<div className="lg:w-[70%] bg-white rounded-tl-3xl flex flex-col justify-center items-center">
				<div className="flex flex-col w-[80%]">
					<h1 className="text-xl mb-6">
						Select your preferred travel style
					</h1>
					<ul className="flex justify-center">
						<li className="mx-8">
							<input
								type="checkbox"
								id="react-option"
								value=""
								className="hidden peer"
								// required=""
							/>
							<label
								htmlFor="react-option"
								className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Premium
									</div>
									<div className="w-full text-sm">
										A premium experience for your journey.
									</div>
								</div>
							</label>
						</li>
						<li className="mx-8">
							<input
								type="checkbox"
								id="flowbite-option"
								value=""
								className="hidden peer"
							/>
							<label
								htmlFor="flowbite-option"
								className="inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
							>
								<div className="block">
									<div className="w-full text-lg font-semibold">
										Budget
									</div>
									<div className="w-full text-sm">
										A budget experience for your journey.
									</div>
								</div>
							</label>
						</li>
					</ul>
				</div>
				{/* <li>
						<input
							type="checkbox"
							id="angular-option"
							value=""
							className="hidden peer"
						/>
						<label
							htmlFor="angular-option"
							className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
						>
							<div className="block">
								<div className="w-full text-lg font-semibold">
									Angular
								</div>
								<div className="w-full text-sm">
									A TypeScript-based web application
									framework.
								</div>
							</div>
						</label>
					</li>
				</ul> */}
			</div>
		</main>
	)
}

export default Preferences
