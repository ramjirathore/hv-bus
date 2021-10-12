import { NextFunction, Request, Response } from 'express';
import { createBus, doReset, fetchAllBuses, fetchBus } from '../services/bus.service';

import { HttpException } from '../middleware/errorHandler';

const addBus = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const newBus = await createBus(req.body);

		res.status(201).json({
			busDetails: newBus
		});

	} catch (err: any) {
		next(new HttpException(400, err.message));
	}
};

const getAllBuses = async (req: Request, res: Response): Promise<Response> => {
	try {
		const allBuses = await fetchAllBuses();
		return res.status(201).json({ allBuses, count: allBuses.length });
	} catch (err: any) {
		return res.status(404).json({
			message: err.message,
			err
		})
	}
};

const getBus = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { busId } = req.params;
		const bus = await fetchBus(busId);
		return res.status(201).json({ bus });
	} catch (err: any) {
		return res.status(404).json({
			message: err.message,
			err
		})
	}
};

const viewEmtpySeats = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { busId } = req.params;
		const bus = await fetchBus(busId);
		return res.status(201).json({ emptySeats: bus?.availableSeats });
	} catch (err: any) {
		return res.status(404).json({
			message: err.message,
			err
		})
	}
};

const resetBus = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { busId } = req.params;
		let bus = await fetchBus(busId);

		if (!bus) {
			return res.status(404).json({
				status: 'fail',
				message: 'Bus doesn\'t exist!'
			});
		}

		await doReset(bus);

		return res.status(201).json({
			message: 'Bus has been reset!'
		});

	} catch (error: any) {
		return res.status(404).json({
			message: error.message,
			error
		});
	}
};


export default { addBus, getBus, getAllBuses, viewEmtpySeats, resetBus };