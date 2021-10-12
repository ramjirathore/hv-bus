import axios from "./axiosConfig";
import { Dispatch } from "react";
import { getAccessToken } from "../helpers/session";
import { fetchBusesEnd, fetchBusesStart, setBuses } from "../store/actions";

export const fetchBuses = async (dispatch: Dispatch<any>) => {
	try {
		dispatch(fetchBusesStart());

		const res = await axios({
			url: `/api/bus/getAllBuses`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': 'Bearer ' + getAccessToken()
			}
		});


		if (res.status === 200 && !res.data.error) {
			dispatch(setBuses(res.data));
		}

		dispatch(fetchBusesEnd());

	} catch {
		(err: Error) => {
			dispatch(fetchBusesEnd());
			console.log(err);
		};
	};
};