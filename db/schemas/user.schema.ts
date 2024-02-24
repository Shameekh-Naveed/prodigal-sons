import { Role, Status } from "@/enums/user.enum"
import { Schema, InferSchemaType, model, models } from "mongoose"

const schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	status: {
		type: String,
		enum: Status,
		required: true,
		default: Status.PENDING
	},
	role: {
		type: String,
		enum: Role,
		required: true,
		default: Role.USER
	},
	profilePicture: { type: String }
	// createdAt: { type: Date, default: Date.now }
})

type User = InferSchemaType<typeof schema>

const User = models.User || model("User", schema)

export default User
