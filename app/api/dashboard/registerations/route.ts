import { NextRequest, NextResponse } from "next/server"
import { ObjectId, Types } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"
import { UserModel } from "@/app/database/schemas/user.schema"
import { RegisterationModel } from "@/app/database/schemas/registeration.schema"
import { PaymentStatus } from "@/app/enums/payment.enum"

const createRoles = [[UserStatus.APPROVED, UserRole.ADMIN]]

// * Get all organizers
export async function GET(request: NextRequest) {
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

		const organizerID = authToken.user._id
		// const organizers = await UserModel.find({ role: UserRole.PARTNER })

		// TODO: Look into this aggregation pipeline maybe
		const registerations = await RegisterationModel.aggregate([
			{
				$lookup: {
					from: "tours",
					localField: "tourID",
					foreignField: "_id",
					as: "tour"
				}
			},
			{
				$unwind: "$tour"
			},
			{
				$match: {
					// "$tour.organizerID": new Types.ObjectId(organizerID.toString())
					organizerID: new Types.ObjectId(organizerID.toString())
				}
			},
			{ $sort: { createdAt: -1 } },
			{ $skip: 0 },
			{ $limit: 5 }
		])

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "stats fetched",
				data: {
					registerations
				}
			},
			{ status: 200 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while fetching the organizers",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		await db.disconnect()
	}
}
