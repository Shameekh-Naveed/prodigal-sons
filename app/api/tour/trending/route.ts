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

// * Get trending tours
export async function GET(request: NextRequest, { params }: any) {
	try {
		await db.connect()
		// get all tours
		const tours = await TourModel.aggregate([
			{
				$lookup: {
					from: "registerations",
					localField: "_id",
					foreignField: "tourID",
					as: "registerations"
				}
			},
			{
				$addFields: {
					registerationCount: { $size: "$registerations" }
				}
			},
			{
				$sort: { registerationCount: -1 }
			},
			{
				$limit: 10
			}
		])
		console.log("nback", { tours })
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
