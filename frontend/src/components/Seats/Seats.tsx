import React, { useState } from 'react';
import Icon from '../../components/Icon/Icon';
import steeringIcon from '../../assets/icons/steering-icon.png';

import seatBlackIcon from '../../assets/icons/seat-black-icon.png';
import seatGreenIcon from '../../assets/icons/seat-green-icon.png';
import seatFilled from '../../assets/icons/seat-filled-black-icon.png';

type SeatsProps = {
	capacity: number;
	busSeats: Array<boolean>,
	availableSeats: Array<number>;
	handleSeatClick: any;
};

const Seats: React.FC<SeatsProps> = (props) => {
	const { capacity, busSeats, availableSeats } = props;

	const getSeat = (seatNo: number, bookedStatus: boolean) => {
		if (!availableSeats.includes(seatNo)) {
			return (
				<div key={seatNo} className='seats__seat' >
					<img src={seatFilled} className='seats__seat--icon' key={seatNo} />
				</div>
			);
		}

		return bookedStatus ?
			(
				<div key={seatNo} className='seats__seat' onClick={() => props.handleSeatClick(seatNo, bookedStatus)} >
					<img src={seatGreenIcon} className='seats__seat--icon' key={seatNo} />
					<p className='seats__seat--no b b--3'>{seatNo}</p>
				</div>
			)
			: (
				<div key={seatNo} className='seats__seat' onClick={() => props.handleSeatClick(seatNo, bookedStatus)} >
					<img src={seatBlackIcon} className='seats__seat--icon' key={seatNo} />
				</div>
			);
	};

	const getRow = (row: number) => {
		let seats = [];
		for (let seat: number = 4 * row + 1; seat <= 4 * row + 4 && seat <= capacity; seat++) {
			seats.push(getSeat(seat, busSeats[seat - 1]));
		}
		return (
			<div className='seats__row' key={row}>
				{seats}
			</div>
		);
	};

	const getColumns = () => {
		let cols = [];
		const totalRows = capacity / 4;

		for (let r = 0; r <= totalRows; r++) {
			cols.push(getRow(r));
		}
		return cols;
	};

	return (
		<div className='seats'>
			<div className='seats__icon'>
				<img src={steeringIcon} alt='steering icon' className='seats__icon--steering' />
			</div>
			{getColumns()}
		</div>
	);
};
export default Seats;