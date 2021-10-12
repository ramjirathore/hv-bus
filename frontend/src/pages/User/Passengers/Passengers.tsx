import React, { useState, useEffect } from 'react'; // React
import { useHistory } from 'react-router'; // Routing

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../../services/booking';
import { RootState } from '../../../store/reducers/root';

// Components
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import FillButton from '../../../components/Button/Fill';

import { fetchBuses } from '../../../services/buses'; // Service
import backIcon from '../../../assets/icons/right-arrow-icon.png'; // Asset

type PassengersProps = {

};

const createPassengers = (bookedSeats: number[]) => {
	return bookedSeats.map((seat: number) => ({ name: '', age: 18, seatNo: seat }));
};

const Passengers: React.FC<PassengersProps> = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const bookingState = useSelector((state: RootState) => state.book);
	const [passengers, setPassengers] = useState(createPassengers(bookingState.bookedSeats));

	useEffect(() => {
		// if no bookings done => can't add passengers
		// so go back 
		if (bookingState.bookedSeats.length == 0)
			history.goBack();
	}, []);

	const handleBookings = async () => {
		// create bookings for all passengers
		await passengers.forEach(passenger => createBooking(passenger, bookingState.busId));
		await fetchBuses(dispatch);
		history.goBack();
	};

	const handleChange = (type: string, val: number | string, index: number) => {
		let updatedPassengers = [...passengers];
		updatedPassengers[index] = { ...updatedPassengers[index], [type]: val };
		setPassengers(updatedPassengers);
	};

	const getPassenger = (name: string, age: number, seatNo: number, index: number) => (
		<div className='passengers__info'>
			<h4 className='b b--3 d--f'>Passenger {index + 1}<p className='text--bold u-m-l-xs'>| Seat {seatNo}</p></h4>
			<Input value={name} type='text' placeholder='Name' handleInput={(val: string) => handleChange('name', val, index)} />
			<Input value={age} type='number' placeholder='Age' handleInput={(val: number) => handleChange('age', val, index)} />
		</div>
	);

	const getPassengers = () => {
		return passengers.map((passenger, index) => {
			return getPassenger(passenger.name, passenger.age, passenger.seatNo, index);
		});
	};

	return (
		<div className='passengers backdrop'>
			<div className='passengers__container card'>
				<div className='passengers__container--head'>
					<Icon src={backIcon} alt='go back' size='xs' onClickHandler={() => history.goBack()} />
					<h2 className='h h--3 text--center'>Passenger Details</h2>
				</div>
				{getPassengers()}
				<div className='passengers__container--footer'>
					<h2 className='b b--2'>Total Fare: INR {bookingState.totalFare.toString() + '.00'}</h2>
					<FillButton text='Proceed to Pay' type={2} onClickHandler={handleBookings} />
				</div>
			</div>
		</div >
	);
};

export default Passengers;