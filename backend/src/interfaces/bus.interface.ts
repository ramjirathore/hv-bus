import { Document } from "mongoose";

export default interface IBus extends Document {
	_id: String,
	busId: String,
	source: String,
	destination: String,
	departure: String,
	arrival: Date,
	fare: Number,
	capacity: Number,
	occupiedSeats: Number[],
	availableSeats: Number[],
	seats: Map<String, Object>,
	tier: String,
	createdAt: Date,
	updatedAt: Date
};

