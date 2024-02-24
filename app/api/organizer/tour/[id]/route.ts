import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"

const roles = [
	[UserStatus.APPROVED, UserRole.PARTNER],
	[UserStatus.APPROVED, UserRole.ADMIN]
]

// * Get a single tour
export async function GET(request: NextRequest, { params }: any) {
	try {
		const tourID = params.id as ObjectId
		await db.connect()

		// Get the JWT token from the request
		// TODO: Deal with the jwt type
		const JwTToken = await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})

		// Check if user is authenticated and has the desired role
		if (!JwTToken || !checkRoles(roles, JwTToken))
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)
		const authToken = JwTToken.accessToken as JwtInterface
		const userID = authToken.user._id.toString()

		// get all tours
		const tour = await TourModel.findById(tourID).populate("organizerID")

		if (
			authToken.roles.includes(UserRole.PARTNER) &&
			userID != tour?.organizerID?.toString()
		)
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)

		// TODO: get enrolled memebers and their statuses
		// TODO: Also maybe get engagements

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tour fetched succesfully",
				data: {
					tour
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while fetching the tour",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		await db.disconnect()
	}
}
