import { UserModel } from "@/app/database/schemas/user.schema"
import { UserRole } from "@/app/enums/user.enum"
import db from "@/utils/db"
import { hashPassword } from "@/utils/hash"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const req = await request.json()
	const { firstName, lastName, email, password, phoneNumber, role } = req
	try {
		await db.connect()
		const userExists = await UserModel.findOne({ email })
		if (userExists)
			return NextResponse.json(
				{
					success: false,
					message: "A user with the same email already exists !",
					error: "Email already exists"
				},
				{ status: 422 }
			)
		const hashedPassword = await hashPassword(password)
		const user = new UserModel({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			phoneNumber,
			role: role || UserRole.USER
		})
		await user.save()
		return NextResponse.json({
			success: true,
			message: "User created successfully!",
			data: {
				user: {
					_id: user._id
				}
			}
		})
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				message: "An error occurred while creating the user !",
				error: error?.message || "Internal Server Error"
			},
			{ status: 500 }
		)
	} finally {
		// // await db.disconnect()
	}
}
