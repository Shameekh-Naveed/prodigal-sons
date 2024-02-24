import { NextRequest, NextResponse } from "next/server"
import { ObjectId, Types } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/app/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"
import { UserModel } from "@/app/database/schemas/user.schema"
import { RegisterationModel } from "@/app/database/schemas/registeration.schema"

const createRoles = [[UserStatus.APPROVED, UserRole.ADMIN]]

// * Get all organizers
export async function GET(request: NextRequest) {
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
		if (!authToken || !checkRoles(createRoles, authToken)) {
			return NextResponse.json(
				{
					success: false,
					message: "Unauthorized",
					error: "You do not have permission to perform this action"
				},
				{ status: 401 }
			)
		}

		const organizerID = authToken.user._id
		// const organizers = await UserModel.find({ role: UserRole.PARTNER })

		// TODO: Look into this aggregation pipeline maybe
		const organizers = await RegisterationModel.aggregate([
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
			}
		])

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Organizers fetched",
				data: {
					organizers
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
