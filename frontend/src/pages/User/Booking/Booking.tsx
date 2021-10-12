import React, { useState } from 'react'; // React
import { useHistory } from 'react-router'; // Routing

// Redux
import { useDispatch } from 'react-redux';
import { setBookingSeats } from '../../../store/actions';

// Components
import Seats from '../../../components/Seats/Seats';
import FillButton from '../../../components/Button/Fill';

// Assets
import seatBlackIcon from '../../../assets/icons/seat-black-icon.png';
import seatGreenIcon from '../../../assets/icons/seat-green-icon.png';
import seatFilledIcon from '../../../assets/icons/seat-filled-black-icon.png';


type BookingProps = {
	busId: string,
	seats: Array<number>,
	capacity: number;
	fare: number,
};

// auxilary function to fill the seats with booked/not booked status
const getSeatsWithStatus = (seats: Array<number>, totalSeats: number): boolean[] => {
	let seatStatus = new Array(totalSeats).fill(1);
	for (let i = 0; i < totalSeats; i++) {
		seatStatus[seats[i] - 1] = seats[i] == 0;
	}
	return seatStatus;
};

const seatLegendClass = 'b b--2 u-m-l-s';

const Booking: React.FC<BookingProps> = (props) => {
	const { busId, seats, capacity, fare } = props;
	const history = useHistory();

	const dispatch = useDispatch();
	const [busSeats, setBusSeats] = useState([...getSeatsWithStatus(seats, capacity)]);

	const handleSeatClick = (seatNo: number, status: boolean) => {
		let updatedSeats = [...busSeats];
		updatedSeats[seatNo - 1] = !status;
		setBusSeats(updatedSeats);
	};

	const handleBooking = () => {
		const newBookedSeats = [];
		for (let i = 0; i < capacity; i++) {
			// add if its a booked seat
			if (busSeats[i] && seats.includes(i + 1)) newBookedSeats.push(i + 1);
		}

		dispatch(setBookingSeats(busId, newBookedSeats, fare * newBookedSeats.length));
		history.push(`/buses/tickets/${busId}/passengers`);
	};

	const getSeatLegendSection = () => (
		<div className='booking__info--legend'>
			<div>
				<div className='d--f' >
					<img src={seatGreenIcon} className='seats__seat--icon' />
					<p className={seatLegendClass}>Selected</p>
				</div>
				<div className='d--f u-m-v-s'>
					<img src={seatBlackIcon} className='seats__seat--icon' />
					<p className={seatLegendClass}>Available</p>
				</div>
				<div className='d--f' >
					<img src={seatFilledIcon} className='seats__seat--icon' />
					<p className={seatLegendClass}>Unavailable</p>
				</div>

			</div>
			<FillButton text='Proceed to Book' type={2} onClickHandler={handleBooking} />
		</div>
	);

	return (
		<div className='booking'>
			<div className='booking__bus'>
				<h3 className='booking__bus--head b b--2'>Click on an Available seat to proceed with your transaction.</h3>
				<Seats capacity={capacity} busSeats={busSeats} handleSeatClick={handleSeatClick} availableSeats={seats} />
			</div>
			<div className='booking__info'>
				<h3 className='h h--2 u-p-b-s'>Seat Legend</h3>
				{getSeatLegendSection()}
			</div>
		</div>
	);
};
export default Booking;;;