import { Document } from "mongoose";
import { Schema } from "mongoose";

export default interface IUser extends Document {
	_id: String,
	name: String,
	email: String,
	password: String,
	age: Number,
	contact: String,
	role: String,
	bookings: Array<Schema.Types.ObjectId>,
	createdAt: Date,
	updatedAt: Date
};

