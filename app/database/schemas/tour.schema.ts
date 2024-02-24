import { TourStatus, TourTypes } from "@/app/enums/tour.enum"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model } from "mongoose"
import { types } from "util"

const tourSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		departure: { type: Date, required: true },
		arrival: { type: Date, required: true },
		organizerID: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		totalAmount: {
			type: Number,
			required: true
		},
		status: {
			type: String,
			enum: TourStatus,
			default: TourStatus.PENDING
		},
		type: {
			type: String,
			enum: TourTypes,
			required: true
		}
	},
	{ timestamps: true }
)

const TourModel = model("Tour", tourSchema)
type Tour = InferSchemaType<typeof tourSchema>

export { TourModel }
export type { Tour }
