// React
import React, { useEffect, Fragment } from "react";

// HOC
import UserRoute from "./hoc/UserRoute";
import AdminRoute from "./hoc/AdminRoute";
import NormalRoute from "./hoc/NormalRoute";

// Redux
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from "./store/reducers/root";
import thunk from 'redux-thunk';

// Helpers
import { getUser, isLoggedIn, setLogout } from './helpers/session';
import checkAccess from './helpers/token';


// Components
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";

// User Pages
import Landing from "./pages/User/Landing/Landing";
import Passengers from "./pages/User/Passengers/Passengers";
import MyTickets from "./pages/User/MyTickets/MyTickets";
import Buses from "./pages/User/Buses/Buses";

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ResetBus from "./pages/Admin/Buses/ResetBus";
import AddBus from "./pages/Admin/Buses/AddBus";

// Auth
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

// Main Scss
import "./main.scss";



const composeEnhancers =
	(process.env.NODE_ENV === 'development'
		? (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
		: null) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const checkTokens = () => { if (!isLoggedIn() || checkAccess().isExp || checkAccess().tknData.name !== getUser().username) setLogout(); };


const App = () => {
	useEffect(() => {
		checkTokens();
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Switch>
					<Route path="/login" render={() => <NormalRoute components={[Login, Landing, Footer]} />} />
					<Route path="/register" render={() => <NormalRoute components={[Landing, Register, Footer]} />} />
					<Route path="/buses/tickets/:id/passengers" exact render={() => <UserRoute components={[Landing, Passengers, Footer]} />} />
					<Route path="/buses/tickets/:uid/user" exact render={() => <UserRoute components={[MyTickets]} />} />
					<Route path="/buses/search" exact render={() => <UserRoute components={[Buses]} />} />
					<Route path="/admin/dashboard/bus/reset" exact render={() => <AdminRoute components={[ResetBus, Dashboard]} />} />
					<Route path="/admin/dashboard/bus/add" exact render={() => <AdminRoute components={[AddBus, Dashboard]} />} />
					<Route path="/admin/dashboard" exact render={() => <AdminRoute components={[Dashboard]} />} />
					<Route path="/" render={() => <NormalRoute components={[Landing, Footer]} />} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
