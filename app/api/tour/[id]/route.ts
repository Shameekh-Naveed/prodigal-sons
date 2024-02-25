import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"

// * Get a single tour
export async function GET(request: NextRequest, { params }: any) {
	try {
		const tourID = params.id as ObjectId
		await db.connect()

		// get all tours
		const tour = await TourModel.findById(tourID)

		// Return success response
		return NextResponse.json(
			{
				success: true,
				message: "Tour fetched succesfully",
				data: {
					tour
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
