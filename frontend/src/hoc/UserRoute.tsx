import React from 'react';

import { Redirect } from 'react-router-dom';

import { isLoggedIn } from '../helpers/session';
import checkAccess from '../helpers/token';


type UserRouteProps = {
	components: Array<any>;
};

const UserRoute: React.FC<UserRouteProps> = (props) => {
	const { components } = props;
	const isAuthenticated = isLoggedIn();

	return isAuthenticated && !checkAccess().isExp ?
		(<React.Fragment>{components.map((Component) => <Component />)}</React.Fragment>)
		:
		(<Redirect to={{ pathname: '/login' }} />);
};


export default UserRoute;
