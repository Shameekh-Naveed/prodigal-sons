import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/app/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"

const roles = [[UserStatus.APPROVED, UserRole.ADMIN]]

// * Get all tours of a single organizer
export async function GET(request: NextRequest, { params }: any) {
	try {
		const organizerID = params.id as ObjectId
		await db.connect()

		// Get the JWT token from the request
		// TODO: Deal with the jwt type
		const authToken = (await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})) as unknown as JwtInterface

		// Check if user is authenticated and has the desired role
		if (!authToken || !checkRoles(roles, authToken))
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)

		const userID = authToken.user._id.toString()

		// get all tours
		const tours = await TourModel.find({ organizerID })

		// TODO: get enrolled memebers and their statuses
		// TODO: Also maybe get engagements

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tour fetched succesfully",
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
