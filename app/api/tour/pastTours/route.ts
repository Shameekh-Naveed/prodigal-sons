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

const createRoles = [[UserRole.USER]]

export async function GET(request: NextRequest, { params }: any) {
	try {
		await db.connect()

		console.log("inside here")

		// Get the JWT token from the request
		const JwtToken = await getToken({
			req: request,
			secret: process.env.JWT_SECRET
		})
		console.log({ JwtToken })
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

		const tours = await RegisterationModel.find({
			userID
		}).populate("tourID")

		console.log({ tours })

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tours fetched succesfully",
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
				message: "An error occurred while fetching the tours",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// Disconnect from the database
		// await db.disconnect()
	}
}
