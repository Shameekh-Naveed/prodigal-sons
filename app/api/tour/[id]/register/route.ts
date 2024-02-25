import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"
import { TripSort } from "@/app/enums/filterParams.enum"
import { TourStatus, TourTypes } from "@/app/enums/tour.enum"
import db from "@/utils/db"
import { paginationParser } from "@/utils/query-parser"
import { RegisterationModel } from "@/app/database/schemas/registeration.schema"

const createRoles = [[UserStatus.APPROVED, UserRole.USER]]

// * Create a new reservation
export async function POST(request: NextRequest, { params }: any) {
	try {
		const req = await request.json()
		const { bill, bookingCount } = req
		const tourID = params.id as ObjectId

		// Connect to the database
		await db.connect()

		// Get the JWT token from the request
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
		const userID = authToken.user._id

		// Create a new tour
		const registeration = new RegisterationModel({
			userID,
			tourID,
			bill,
			bookingCount
		})

		// Save the order to the database
		await registeration.save()

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "registeration initalized successfully",
				data: {
					registeration: {
						_id: registeration._id
					}
				}
			},
			{ status: 201 }
		)
	} catch (error: any) {
		console.log({ error })
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while creating the registeration",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		// await db.disconnect()
	}
}
