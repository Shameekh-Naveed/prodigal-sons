import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model, models } from "mongoose"
import mongoose from "mongoose"

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: { type: String },
		status: {
			type: String,
			enum: UserStatus,
			required: true,
			default: UserStatus.APPROVED
		},
		role: {
			type: String,
			enum: UserRole,
			required: true,
			default: UserRole.USER
		},
		profilePicture: {
			type: String,
			default: "https://static.thenounproject.com/png/4035889-200.png"
		},
		preferences: [
			{
				type: String,
				default: []
			}
		]
	},
	{ timestamps: true }
)

type User = InferSchemaType<typeof userSchema>
const UserModel = models?.User || model("User", userSchema)
// const UserModel = model("User", userSchema)

export { UserModel }
export type { User }
