function paginationParser(page: number, inputLimit: number) {
	const limit = inputLimit > 0 ? inputLimit : 10
	const skip = page * limit
	return [limit, skip]
}
