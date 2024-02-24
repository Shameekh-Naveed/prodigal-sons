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
import { UserModel } from "@/app/database/schemas/user.schema"

const createRoles = [[UserStatus.APPROVED, UserRole.USER]]

export async function POST(request: NextRequest) {
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
		const userID = authToken.user._id
		const { preferences } = req

		const update = UserModel.findByIdAndUpdate(userID, { preferences })

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tour initalized successfully",
				data: {
					message: "Success"
				}
			},
			{ status: 201 }
		)
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while performing this action",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		await db.disconnect()
	}
}
