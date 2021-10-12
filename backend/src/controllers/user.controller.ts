import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import config from '../config/config';

import { createAdmin, createUser, fetchUserbyEmail, fetchUsers } from '../services/user.service';
import { HttpException } from '../middleware/errorHandler';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await createUser(req.body);
		res.status(201).json(user);
	} catch (err: any) {
		next(new HttpException(500, err.message));
	}
};


const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await createAdmin(req.body);
		res.status(201).json(user);
	} catch (err: any) {
		next(new HttpException(500, err.message));
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await fetchUserbyEmail(email);

		if (!user) {
			next(new HttpException(404, 'User not found!'));
		} else if (user.role !== 'user') {
			next(new HttpException(401, 'You are not authorized as user! Cannot login.'));
		} else {

			const result = bcrypt.compare(password, user.password.toString());
			if (!result) {
				next(new HttpException(401, 'Login failure! Incorrect email or password.'));
			} else {
				const token = jwt.sign({ _id: user._id.toString() }, config.server.token.secret, {
					expiresIn: config.server.token.expireTime
				});

				res.status(201).json({
					message: 'Login as User Successful!',
					authToken: token
				});
			}

		}
	} catch (err: any) {
		next(new HttpException(401, err.message))

	}
};

const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const admin = await fetchUserbyEmail(email);

		if (!admin) {
			next(new HttpException(404, 'User not found!'));
		} else if (admin.role !== 'admin') {
			next(new HttpException(401, 'You are not authorized as Admin! Cannot login.'));
		} else {

			const result = bcrypt.compare(password, admin.password.toString());
			if (!result) {
				next(new HttpException(401, 'Login failure! Incorrect email or password.'));
			} else {
				const token = jwt.sign({ _id: admin._id.toString() }, config.server.token.secret, {
					expiresIn: config.server.token.expireTime
				});

				res.status(201).json({
					message: 'Login as Admin Successful!',
					authToken: token
				});
			}

		}
	} catch (err: any) {
		next(new HttpException(401, err.message))
	}
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await fetchUsers();
		res.status(201).json({ users, count: users.length });
	} catch (err: any) {
		next(new HttpException(404, err.message))
	}
};

export default { registerUser, registerAdmin, loginAdmin, loginUser, getAllUsers };