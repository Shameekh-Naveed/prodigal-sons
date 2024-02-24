import { PaymentStatus } from "@/app/enums/payment.enum"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model, models } from "mongoose"

const quotationSchema = new Schema(
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
		quote: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
)

type Quotation = InferSchemaType<typeof quotationSchema>
const QuotationModel = model("Quotation", quotationSchema)

export { QuotationModel }
