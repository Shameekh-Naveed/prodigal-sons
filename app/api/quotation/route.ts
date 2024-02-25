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
import { QuotationModel } from "@/app/database/schemas/quotation.schema"

const createRoles = [[UserRole.PARTNER, UserStatus.APPROVED]]
export async function POST(request: NextRequest, { params }: any) {
	try {
		await db.connect()
		const req = await request.json()
		const { tourID, price } = req

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

		const quotation = new QuotationModel({
			userID,
			tourID,
			price
		})

		await quotation.save()
		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Quotation creted successfully",
				data: {
					quotation: {
						_id: quotation._id
					}
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
