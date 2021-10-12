import { LeanDocument } from 'mongoose';
import { omit } from "lodash";

import Ticket from '../models/ticket.model';
import User from '../models/user.model';

import ITicket from '../interfaces/ticket.interface';
import IUser from '../interfaces/user.interface';
import IBus from '../interfaces/bus.interface';


export const createTicket = async (ticketData: ITicket, user: IUser, bus: IBus): Promise<Omit<LeanDocument<ITicket>, "__v">> => {
	const { seatNo } = ticketData;

	// Create a booking
	const newTicket = await Ticket.create({
		...ticketData,
		userId: user['_id'],
		status: 'booked',
	});

	// Update vacant seats and userid 
	const ticketId = newTicket['_id'];
	bus.seats.set(seatNo.toString(), { ticketId, userId: user['_id'] });

	// remove booked seat from available seats
	const index = bus['availableSeats'].indexOf(seatNo);
	bus['availableSeats'].splice(index, 1);

	// add it into occupied seats
	bus['occupiedSeats'].push(seatNo);

	await bus.save();

	// Add the current ticketId
	const currUser: any = await User.findById(user['_id']);
	const currBookings = currUser['bookings'];
	currBookings.push(ticketId);

	await User.findByIdAndUpdate(user['_id'], { bookings: currBookings });

	return omit(newTicket.toJSON(), ["__v"]);
};

export const fetchTickets = async (busId: string): Promise<ITicket[]> => {
	const tickets: ITicket[] = await Ticket.find({ busId, status: 'booked' }, { "__v": 0 });
	return tickets;
};

