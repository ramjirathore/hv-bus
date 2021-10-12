import { LeanDocument } from 'mongoose';
import Bus from '../models/bus.model';
import Ticket from '../models/ticket.model';
import IBus from '../interfaces/bus.interface';
import { omit } from "lodash";

export const createBus = async (busData: IBus): Promise<Omit<LeanDocument<IBus>, "__v">> => {
	const availableSeats = [];
	for (let i = 0; i < busData.capacity; i++) {
		availableSeats[i] = i + 1;
	}

	// create a bus
	const newBus = await Bus.create({
		...busData,
		occupiedSeats: [],
		availableSeats,
		seats: {}
	});

	return omit(newBus.toJSON(), ["__v"]);
};

export const fetchAllBuses = async (): Promise<IBus[]> => {
	const buses: IBus[] = await Bus.find({}, { "__v": 0 });
	return buses;
};

export const fetchBus = async (busId: string): Promise<IBus | null> => {
	const bus: (IBus | null) = await Bus.findOne({ busId }, { "__v": 0 });
	return bus;
};

export const doReset = async (bus: IBus): Promise<IBus> => {

	const capactiy = bus['capacity'];
	for (let seat = 1; seat <= capactiy; seat++) {
		const s = seat;
		if (bus.seats.get(s.toString())) {
			const { ticketId }: any = bus.seats.get(s.toString());
			console.log(ticketId);
			await Ticket.findByIdAndUpdate(ticketId, { status: 'cancelled' });
		}
	}

	bus.seats = new Map<String, Object>();

	const availableSeats = [];
	for (let i = 0; i < bus.capacity; i++) {
		availableSeats[i] = i + 1;
	}

	bus.availableSeats = availableSeats;
	bus.occupiedSeats = [];

	bus.save();

	return bus;
}
