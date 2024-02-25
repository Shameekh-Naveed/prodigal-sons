import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"

const createRoles = [[UserStatus.APPROVED, UserRole.USER]]

export async function POST(request: NextRequest, { params }: any) {
	try {
		const registerationID = params.id as ObjectId
		const req = await request.json()
		const { rating } = req
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

		const registeration = await TourModel.findById(registerationID)

		if (!registeration)
			return NextResponse.json(
				{
					success: false,
					message: "Registeration not found",
					error: "Registeration not found"
				},
				{ status: 404 }
			)

		if (registeration.userID.toString() !== userID.toString())
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)

		registeration.rating = rating

		await registeration.save()

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Review added successfully",
				data: {
					message: "Success"
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
		// await db.disconnect()
	}
}
