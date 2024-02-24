import { TourCategory, TourStatus, TourTypes } from "@/app/enums/tour.enum"
import { UserRole, UserStatus } from "@/app/enums/user.enum"
import { Schema, InferSchemaType, model, models } from "mongoose"
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
		// _id: Schema.Types.ObjectId,

		title: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String },
		departure: { type: Date, required: true },
		arrival: { type: Date, required: true },
		organizerID: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		itinerary: [{ type: itinerarySchema, default: [] }],
		price: {
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
		},
		category: {
			type: String,
			enum: TourCategory,
			default: TourCategory.RELEGIOUS
		}
	},
	{ timestamps: true }
)

const TourModel = models.Tour || model("Tour", tourSchema)
const ItineraryModel = models.Tour || model("Itinerary", itinerarySchema)
const AttractionModel = models.Tour || model("Attraction", attractionSchema)

type Tour = InferSchemaType<typeof tourSchema>
type Itinerary = InferSchemaType<typeof itinerarySchema>
type Attraction = InferSchemaType<typeof attractionSchema>

export { TourModel, ItineraryModel, AttractionModel }
export type { Tour, Itinerary, Attraction }
