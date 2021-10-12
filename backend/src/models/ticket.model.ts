import mongoose, { Schema } from 'mongoose';
import ITicket from '../interfaces/ticket.interface';

const ticketSchema = new mongoose.Schema(
	{
		passenger: {
			type: String,
			required: true
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		busId: {
			type: String,
			ref: 'Bus',
			required: true,
		},
		seatNo: {
			type: Number,
			require: true
		},
		status: {
			type: String,
			enum: ['booked', 'cancelled'],
			required: true,
			default: 'booked'
		},
	},
	{
		timestamps: true
	}
);

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
export default Ticket;