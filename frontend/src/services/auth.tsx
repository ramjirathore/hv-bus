import axios from "./axiosConfig";
import { Dispatch } from "react";

import { setAccessToken, setUser } from "../helpers/session";
import { setUserData, toggleLoggedIn } from "../store/actions";
import { setUserError } from "../store/actions/user";

export const doLogin = (email: string, password: string, isAdmin: boolean, dispatch: Dispatch<any>, history: any) => {
	const loginAuthority = 'login' + (isAdmin ? 'Admin' : 'User');
	console.log(loginAuthority);

	axios({
		url: `/api/users/${loginAuthority}`,
		method: 'POST',
		data: {
			email,
			password
		},
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	})
		.then((res: any) => {
			// dispatch(toggleLoading(false));
			if (res.status === 201 && !res.data.error) {
				setAccessToken(res.data.token);
				setUser(res.data.user);
				dispatch(setUserData(res.data.user));
				dispatch(toggleLoggedIn(true));
				history.push('/');
			}
			// else dispatch(setAlert(-1, "Error while fetching exam data. Please try again"));
		})
		.catch((err: any) => {
			console.log({ err });
			dispatch(setUserError(err.response.data.message));
			setTimeout(() => { dispatch(setUserError('')); }, 3000);
		});
};

export const doRegister = (signupData: any, isAdmin: boolean, dispatch: Dispatch<any>, history: any) => {
	const registerAuthority = 'register' + (isAdmin ? 'Admin' : 'User');

	axios({
		url: `http://localhost:5000/api/users/${registerAuthority}`,
		method: 'POST',
		data: {
			name: signupData.firstName + ' ' + signupData.lastName,
			email: signupData.email,
			password: signupData.password,
			age: signupData.age
		},
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	})
		.then((res: any) => {
			// dispatch(toggleLoading(false));
			if (res.status === 201 && !res.data.error) {
				console.log('Registered', res.data);
				history.push('/login');
			}
			// else dispatch(setAlert(-1, "Error while fetching exam data. Please try again"));
		})
		.catch((err: any) => {
			dispatch(setUserError(err.response.data.message));
			setTimeout(() => { dispatch(setUserError('')); }, 3000);
		});
};