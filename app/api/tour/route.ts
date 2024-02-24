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

const createRoles = [
	[UserStatus.APPROVED, UserRole.PARTNER],
	[UserStatus.APPROVED, UserRole.ADMIN],
	[UserStatus.APPROVED, UserRole.USER]
]

// * Create a new tour
export async function POST(request: NextRequest) {
	try {
		const req = await request.json()
		// Connect to the database
		await db.connect()

		// Get the JWT token from the request
		// TODO: Deal with the jwt type
		const JwtToken = await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})

		// Check if user is authenticated and has the desired role
		if (!JwtToken || !checkRoles(createRoles, JwtToken)) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)
		}
		const authToken = JwtToken.accessToken as JwtInterface
		const isPartner = authToken.roles.find(
			role => role === UserRole.PARTNER
		)

		const {
			title,
			description,
			departure,
			arrival,
			itinerary,
			totalAmount,
			type,
			category
		} = req

		// Create a new tour
		const tour = new TourModel({
			title,
			description,
			departure,
			arrival,
			itinerary,
			totalAmount,
			type,
			category,
			organizerID: authToken.user._id,
			status: isPartner ? TourStatus.APPROVED : TourStatus.REQUESTED
		})

		// Save the order to the database
		await tour.save()

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tour initalized successfully",
				data: {
					tour: {
						_id: tour._id
					}
				}
			},
			{ status: 201 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while creating the tour",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		await db.disconnect()
	}
}

// * Get all tours
export async function GET(request: NextRequest, { params }: any) {
	try {
		await db.connect()

		const { searchParams } = new URL(request.url)
		const pageParam = +(searchParams.get("page") || 0)
		const limitParam = +(searchParams.get("limit") || 0)

		const [limit, skip] = paginationParser(pageParam, limitParam)

		const { sort, filters } = getTripFilters(searchParams)

		// get all tours
		const tours = await TourModel.find(filters)
			.populate("organizerID")
			.sort(sort)
			.skip(skip)
			.limit(limit)

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
	const category = searchParams.get("category") || ""
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

	if (category) sort.category = category

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
