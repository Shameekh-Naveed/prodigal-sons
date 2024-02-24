import { TourStatus, TourTypes } from "@/app/enums/tour.enum"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model } from "mongoose"
import { types } from "util"

const attractionSchema = new Schema({
	time: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String }
})

const itinerarySchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	day: { type: Number, required: true },
	nightStay: { type: String }
})

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
		itinerary: [{ type: itinerarySchema, default: [] }],
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
const ItineraryModel = model("Itinerary", itinerarySchema)
const AttractionModel = model("Attraction", attractionSchema)

type Tour = InferSchemaType<typeof tourSchema>
type Itinerary = InferSchemaType<typeof itinerarySchema>
type Attraction = InferSchemaType<typeof attractionSchema>

export { TourModel, ItineraryModel, AttractionModel }
export type { Tour, Itinerary, Attraction }
