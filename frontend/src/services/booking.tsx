import axios from "./axiosConfig";
import { getAccessToken } from "../helpers/session";


export const createBooking = async (passenger: any, busId: string) => {
	try {
		const res = await axios({
			url: "http://localhost:5000/api/bus/bookTicket",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			},
			data: {
				busId,
				name: passenger.name,
				age: passenger.age,
				seatNumber: passenger.seatNo
			}
		});

		if (res.status === 200 && !res.data.error) {
			console.log(res.data);
		}

	} catch {
		(err: Error) => console.log(err);
	};
};

export const fetchMyTickets = async (): Promise<any> => {
	try {
		const res = await axios({
			url: "http://localhost:5000/api/bus/getMyTickets",
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			}
		});

		if (res.status === 200 && !res.data.error) {
			return res.data;
		}

	} catch {
		(err: Error) => console.log(err);
	};
};


export const cancelTicket = async (ticketId: string): Promise<any> => {
	try {
		const res = await axios({
			url: "/api/bus/cancelTicket/" + ticketId,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			}
		});

		console.log('in cancel');
		if (res.status === 200 && !res.data.error) {
			console.log('ticket cancelled', res.data);
		}

	} catch {
		(err: Error) => console.log(err);
	};
};