import React from 'react'; // React
import moment from 'moment'; // Moment library

// Components
import Icon from '../Icon/Icon';
import FillButton from '../Button/Fill';

// Asset
import busIcon from '../../assets/icons/bus-small-icon.png';

type BusTileProps = {
	service: string;
	departure: string;
	arrival: string;
	startDate: string;
	endDate: string;
	fare: number;
	seatsAvailable: number;
	view: boolean;
	handleViewSeats: React.MouseEventHandler<HTMLDivElement>;
};

const BusTile: React.FC<BusTileProps> = (props) => {
	const { service, departure, arrival, fare, seatsAvailable, startDate, endDate, view } = props;

	// finding arrival and departure time
	const deptTime = startDate.split('T')[1].substring(0, 5);
	const arrTime = endDate.split('T')[1].substring(0, 5);

	// finding arrival and departure date
	const deptDate = moment(startDate).format('D') + ' ' + moment(startDate).format('MMM');
	const arrDate = moment(endDate).format('D') + ' ' + moment(endDate).format('MMM');

	// finding total duration
	const getTotalDuration = () => {
		const duration = moment.duration(moment(endDate).diff(moment(startDate)));
		let days = duration.days();
		let hours = duration.hours();
		let mins = duration.minutes();

		let totalDuration = '';
		if (days) {
			totalDuration += days + 'd ';
		}
		if (hours) {
			totalDuration += hours + 'h ';
		}
		if (mins) {
			totalDuration += mins + 'm';
		}

		return totalDuration;
	};

	return (
		<div className='bustile card'>
			<Icon src={busIcon} size='s' alt='bus icon' extraStyle='u-m-r-m' />
			<div><h1 className='h h--l2'> {service} </h1></div>
			<div className='bustile__departure'>
				<h2 className='d d--2'>{deptTime}</h2>
				<h2 className='h h--4'>{deptDate}</h2>
				<h3 className='b b--1 a--danger'>{departure}</h3>
			</div>
			<div><h2 className='b b--2 bustile--line'>{getTotalDuration()}</h2></div>
			<div className='bustile__arrival'>
				<h2 className='d d--2'>{arrTime}</h2>
				<h2 className='h h--4'>{arrDate}</h2>
				<h3 className='b b--1 a--info'>{arrival}</h3>
			</div>
			<div><h2 className='d h--2'>INR {fare}</h2></div>
			<div>
				<h2 className='b b--2'>{seatsAvailable}
					<span className='text--disabled'> Seats available</span>
				</h2>
			</div>
			<div>
				{view ?
					<FillButton text='Hide Seats' type={1} onClickHandler={props.handleViewSeats} />
					:
					<FillButton text='View Seats' type={2} onClickHandler={props.handleViewSeats} />
				}
			</div>
		</div>
	);
};
export default BusTile;