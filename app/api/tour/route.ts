import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/app/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"

const roles = [
	[UserStatus.APPROVED, UserRole.PARTNER],
	[UserStatus.APPROVED, UserRole.ADMIN]
]

// * Create a tour
export async function POST(request: NextRequest, { params }: any) {
	try {
		const req = await request.json()
		// Connect to the database
		await db.connect()

		// Get the JWT token from the request
		// TODO: Deal with the jwt type
		const authToken = (await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})) as unknown as JwtInterface

		// Check if user is authenticated and has the desired role
		if (!authToken || !checkRoles(roles, authToken)) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)
		}

		const reqUser = authToken.user

		const {
			title,
			description,
			departure,
			arrival,
			itinerary,
			totalAmount,
			type
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
			organizerID: reqUser._id
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
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while placing the order",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		await db.disconnect()
	}
}
