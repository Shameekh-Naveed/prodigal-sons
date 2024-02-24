import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongoose"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { getToken } from "next-auth/jwt"
import { checkRoles } from "@/app/utils/auth"
import { TourModel } from "@/app/database/schemas/tour.schema"
import { JwtInterface } from "@/app/interfaces/jwt.interface"
import { UserModel } from "@/app/database/schemas/user.schema"

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
		// const organizers = await UserModel.find({ role: UserRole.PARTNER })

		// TODO: Look into this aggregation pipeline maybe
		const organizers = await TourModel.aggregate([
			{
				$lookup: {
					from: "users",
					localField: "organizerID",
					foreignField: "_id",
					as: "user"
				}
			},
			{
				$unwind: "$user"
			},
			{
				$group: {
					_id: {
						fistName: "$firstName"
					},
					count: {
						$sum: 1
					}
				}
			},
			{
				$project: {
					// interviewVenue: "$interviewVenue"
					firstName: "$firstName",
					lastName: "$lastName",
					count: 1
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
