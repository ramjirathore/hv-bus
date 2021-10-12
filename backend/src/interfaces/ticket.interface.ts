import { Document } from "mongoose";
import { Schema } from "mongoose";

export default interface ITicket extends Document {
	_id: String,
	passenger: String,
	userId: Schema.Types.ObjectId,
	busId: String,
	seatNo: Number,
	status: String,
	createdAt: Date,
	updatedAt: Date
};

