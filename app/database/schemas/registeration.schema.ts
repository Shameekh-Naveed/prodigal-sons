import { PaymentStatus } from "@/app/enums/payment.enum"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model, models } from "mongoose"

const registerationSchema = new Schema(
	{
		userID: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		tourID: {
			type: Schema.Types.ObjectId,
			ref: "Tours",
			required: true
		},
		paymentStatus: {
			type: String,
			enum: PaymentStatus,
			default: PaymentStatus.PENDING
		},
		bookingCount: {
			type: Number,
			default: 1
		}
	},
	{ timestamps: true }
)

type Registeration = InferSchemaType<typeof registerationSchema>
const RegisterationModel = model("Registeration", registerationSchema)

export { RegisterationModel }
