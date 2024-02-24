import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { isPasswordValid } from "./hash"
import db from "./db"
import { User, UserModel } from "@/app/database/schemas/user.schema"

export const authOptions: NextAuthOptions = {
	secret: process.env.JWT_SECRET,
	session: {
		maxAge: 30 * 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
		strategy: "jwt"
	},
	pages: {
		signIn: "/signin"
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			id: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email"
				},
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials: any, req: any): Promise<any | null> {
				await db.connect()
				if (!credentials?.email || !credentials?.password) {
					return null
				}
				const user = (await UserModel.findOne({
					email: credentials.email
				})) as User

				if (!user) return null

				const isPasswordMatch = await isPasswordValid(
					credentials.password,
					user.password
				)

				if (!isPasswordMatch || !user) {
					return null
				}
				const roles = [user.role, user.status]
				return { user, roles }
			}
		})
	]
}
