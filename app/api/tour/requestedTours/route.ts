import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"
import { TourStatus } from "@/app/enums/tour.enum"
import { paginationParser } from "@/utils/query-parser"

const createRoles = [[UserStatus.APPROVED, UserRole.USER]]

// * Get all requested tours
export async function GET(request: NextRequest, { params }: any) {
	try {
		await db.connect()

		const { searchParams } = new URL(request.url)
		const pageParam = +(searchParams.get("page") || 0)
		const limitParam = +(searchParams.get("limit") || 0)
		const [limit, skip] = paginationParser(pageParam, limitParam)

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

		// get all tours
		const tours = await TourModel.find({ organizerID })

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
		await db.disconnect()
	}
}
