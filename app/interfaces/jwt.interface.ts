import { ObjectId, Types } from "mongoose"
import { UserRole, UserStatus } from "../enums/user.enum"

export interface JwtInterface {
	user: {
		_id: ObjectId | Types.ObjectId
		firstName: string
		lastName: string
		email: string
		profilePicture: string
	}
	// roles: (UserRole | UserStatus)[]
	roles: string[]
}
