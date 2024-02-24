import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model, models } from "mongoose"

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		status: {
			type: String,
			enum: UserStatus,
			required: true,
			default: UserStatus.PENDING
		},
		role: {
			type: String,
			enum: UserRole,
			required: true,
			default: UserRole.USER
		},
		profilePicture: { type: String }
	},
	{ timestamps: true }
)

type User = InferSchemaType<typeof userSchema>
// const User = models.User || model("User", schema)
const User = model("User", userSchema)

export { User }
