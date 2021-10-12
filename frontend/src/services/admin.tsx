import axios from "./axiosConfig";
import { getAccessToken } from "../helpers/session";


export const doReset = async (busId: string) => {
	try {
		const res = await axios({
			url: "/api/bus/resetBus/" + busId,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			},
			data: { busId }
		});

		if (res.status === 200 && !res.data.error) {
			console.log('bus reset done', res.data);
		}

	} catch {
		(err: Error) => console.log(err);
	};
};


export const doAddBus = async (busData: any) => {
	try {
		const res = await axios({
			url: "/api/bus/addBus",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			},
			data: {
				...busData,
			}
		});

		if (res.status === 200 && !res.data.error) {
			console.log('bus added', res.data);
		}

	} catch {
		(err: Error) => console.log(err);
	};
};

export const fetchAllTickets = async (busData: any) => {
	try {
		const res = await axios({
			url: "/api/bus/getAllTickets",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			},
			data: {
				...busData,
			}
		});

		if (res.status === 200 && !res.data.error) {
			console.log('tickets fetched', res.data);
		}

	} catch {
		(err: Error) => console.log(err);
	};
};
