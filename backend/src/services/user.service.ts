import { LeanDocument } from 'mongoose';
import User from '../models/user.model';
import IUser from '../interfaces/user.interface';
import { omit } from "lodash";

import bcrypt from 'bcryptjs';

export const createUser = async (userData: IUser): Promise<Omit<LeanDocument<IUser>, "__v" | "password">> => {
	const { password }: any = userData;

	const hash = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...userData,
		password: hash,
		role: 'user',
		bookings: []
	});

	return omit(newUser.toJSON(), ["__v", "password"]);
};

export const createAdmin = async (userData: IUser): Promise<Omit<LeanDocument<IUser>, "__v" | "password">> => {
	const { password }: any = userData;

	const hash = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...userData,
		password: hash,
		role: 'admin',
		bookings: []
	});

	return omit(newUser.toJSON(), ["__v", "password"]);
};

export const fetchUserbyEmail = async (email: string): Promise<IUser | null> => {
	const user: (IUser | null) = await User.findOne({ email }, { "__v": 0 });
	return user;
};

export const fetchUsers = async (): Promise<IUser[]> => {
	const users: IUser[] = await User.find({}, { "__v": 0, "password": 0 });
	return users;
};

