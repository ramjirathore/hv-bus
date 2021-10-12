import mongoose, { Schema } from 'mongoose';
import IBus from '../interfaces/bus.interface';

const busSchema = new mongoose.Schema(
	{
		busId: {
			type: String,
			length: 7,
			required: true,
			unique: true
		},
		source: {
			type: String,
			required: true
		},
		destination: {
			type: String,
			required: true
		},
		departure: {
			type: Date,
			required: true,
		},
		arrival: {
			type: Date,
			required: true,
		},
		fare: {
			type: Number,
			required: true
		},
		capacity: {
			type: Number,
			required: true
		},
		occupiedSeats: {
			type: [Number]
		},
		availableSeats: {
			type: [Number]
		},
		seats: {
			type: Map,
			of: {
				ticketId: {
					type: Schema.Types.ObjectId,
					ref: 'Ticket'
				},
				userId: {
					type: Schema.Types.ObjectId,
					ref: 'User'
				}
			}
		},
		tier: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const Bus = mongoose.model<IBus>('Bus', busSchema);
export default Bus;

