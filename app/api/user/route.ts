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
import { UserModel } from "@/app/database/schemas/user.schema"

// * Get user details
export async function GET(request: NextRequest, { params }: any) {
	try {
		await db.connect()

		// Get the JWT token from the request
		const JwtToken = await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})

		if (!JwtToken)
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)

		const authToken = JwtToken.accessToken as JwtInterface

		const user = await UserModel.findById(authToken.user._id).select(
			"-password"
		)

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "User fetched successfully",
				data: {
					user
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while fetching the user",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		// // await db.disconnect()
	}
}

export async function PATCH(request: NextRequest, { params }: any) {
	try {
		await db.connect()
		const req = await request.json()

		// Get the JWT token from the request
		const JwtToken = await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})

		if (!JwtToken)
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)

		const authToken = JwtToken.accessToken as JwtInterface
		const userID = authToken.user._id

		const { firstName, lastName, email, phoneNumber } = req

		const user = await UserModel.findByIdAndUpdate(userID, {
			firstName,
			lastName,
			email,
			phoneNumber
		})

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "User modified successfully",
				data: {
					message: "truei"
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while fetching the user",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	}
}
