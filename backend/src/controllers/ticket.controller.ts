import { Request, Response, NextFunction } from 'express';
import IBus from '../interfaces/bus.interface';
import { HttpException } from '../middleware/errorHandler';

import Bus from '../models/bus.model';
import Ticket from '../models/ticket.model';
import User from '../models/user.model';

import { fetchBus } from '../services/bus.service';
import { fetchTickets, createTicket } from '../services/ticket.service';

const bookTicket = async (req: any, res: Response, next: NextFunction) => {
	try {
		const { busId, seatNo } = req.body;

		// Check if bus even exists
		let bus: (IBus | null) = await fetchBus(busId);
		if (!bus) {
			next(new HttpException(404, `Bus ${busId} doesn\'t exist!`));
		} else {

			// Check if the given seat no exists in bus
			const capacity = bus['capacity'];
			if (seatNo > capacity) {
				next(new HttpException(404, 'This seat doesn\'t exist! Please choose a valid seat.'));
			}

			// Check if seat is not already booked
			if (bus?.seats.get(seatNo.toString())) {
				next(new HttpException(400, 'This seat is already booked! Please choose another seat.'));
			}

			const ticket = await createTicket(req.body, req.user, bus);
			res.status(201).json({ message: 'Your ticket is booked!', ticket });
		}
	} catch (err: any) {
		next(new HttpException(500, err.message));
	}
};


const myTickets = async (req: any, res: Response, next: NextFunction) => {
	try {
		// Populate the bookings
		const user: any = await User.findById(req.user['_id'], { "__v": 0 }).populate('bookings');
		const bookedTickets: any = [];
		user['bookings'].forEach((booking: any) => {
			if (booking['status'] == 'booked')
				bookedTickets.push(booking);
		});

		return res.status(201).json({
			bookings: bookedTickets,
			count: bookedTickets.length
		});

	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};

const getAllTickets = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { busId } = req.params;
		const tickets = await fetchTickets(busId);

		res.status(200).json({
			tickets,
			count: tickets.length
		})
	}
	catch (err: any) {
		next(new HttpException(404, err.message));
	}
}


const cancelTicket = async (req: any, res: Response, next: NextFunction) => {
	const { ticketId } = req.params;

	try {

		// Check if user is deleting its own booking
		const ticket: any = await Ticket.findById(ticketId);


		if (req.user['_id'].toString() != ticket['userId'].toString()) {
			return res.status(404).json({
				message: 'You have not booked this ticket!'
			});
		}

		// Check if ticket is already cancelled
		if (ticket['status'] != 'booked') {
			return res.status(404).json({
				message: 'Booking is already cancelled!'
			});
		}

		// Ready to cancel
		ticket['status'] = 'cancelled';

		console.log(ticket);

		let bus: any;
		try {
			bus = await Bus.findOne({ busId: ticket['busId'] });
		} catch (err) {
			return res.status(404).json({
				message: 'Bus doesn\'t exists!'
			});
		}

		// Update vacant seat
		const seatNo = ticket['seatNo'];

		// remove booked seat from occupied seats
		const index = bus['occupiedSeats'].indexOf(seatNo);
		bus['occupiedSeats'].splice(index, 1);

		// make the seat available again
		bus['availableSeats'].push(seatNo);

		bus.seats.set(seatNo.toString(), undefined);

		await ticket.save();
		await bus.save();

		return res.status(201).json({
			message: 'Your ticket has been cancelled!'
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
			error
		});
	}
};

export default { myTickets, bookTicket, getAllTickets, cancelTicket };