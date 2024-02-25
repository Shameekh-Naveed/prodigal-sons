import { PaymentStatus } from "@/app/enums/payment.enum"
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
		bill: {
			type: Number,
			required: true
		},
		bookingCount: {
			type: Number,
			default: 1
		},
		rating: {
			type: Number
		}
	},
	{ timestamps: true }
)

type Registeration = InferSchemaType<typeof registerationSchema>
const RegisterationModel =
	models.Registeration || model("Registeration", registerationSchema)

export { RegisterationModel }
