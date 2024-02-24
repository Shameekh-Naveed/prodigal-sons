import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"
import { TripSort } from "@/app/enums/filterParams.enum"
import { TourStatus } from "@/app/enums/tour.enum"
import db from "@/utils/db"

// * Get trending tours
export async function GET(request: NextRequest, { params }: any) {
	try {
		await db.connect()

		// get all tours
		// TODO: COmplete this
		const tours = await TourModel.find().populate("organizerID")
		// const tours = await TourModel.aggregate([])

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tours fetched succesfully",
				data: {
					tours
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while fetching the tours",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		await db.disconnect()
	}
}

const getTripFilters = (searchParams: URLSearchParams) => {
	const orderBy =
		(searchParams.get("sort") as TripSort) || TripSort.CREATED_DEC
	const searchQuery = searchParams.get("query") || ""
	const words = searchQuery.split(/\s+/).filter(word => word !== "")
	const regexPattern = words.map(word => new RegExp(word, "i"))
	const filters: any = {
		status: TourStatus.APPROVED
	}
	const sort: any = {}
	if (words.length > 0) {
		filters.name = regexPattern
		filters.description = regexPattern
	}

	switch (orderBy) {
		case TripSort.CREATED_DEC:
			sort.createdAt = "desc"
			break
		case TripSort.DEPARTURE_ASC:
			sort.departure = "asc"
			break
		case TripSort.DEPARTURE_DEC:
			sort.departure = "desc"
			break
		case TripSort.PRICE_ASC:
			sort.price = "asc"
			break
		case TripSort.PRICE_DEC:
			sort.price = "desc"
			break
	}

	return { sort, filters }
}
