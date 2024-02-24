import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const authUser = async (req: NextRequest) => {
	const token = await getToken({ req, secret: process.env.JWT_SECRET })
	if (token) return token
	return NextResponse.json(
		{
			success: false,
			message: "Unauthorized",
			error: "Invalid or missing token"
		},
		{ status: 401 }
	)
}

const checkRoles = (requiredRoles: string[][], user: any) => {
	const userRoles = user?.roles
	if (requiredRoles.length === 0) return true
	for (const rolesSet of requiredRoles) {
		if (rolesSet.every((role: string) => userRoles?.includes(role)))
			return true
	}
	return false
}

export { authUser, checkRoles }
