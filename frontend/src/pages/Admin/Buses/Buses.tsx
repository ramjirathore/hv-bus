import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FillButton from '../../../components/Button/Fill';
import Table from '../../../components/Table/Table';
import { RootState } from '../../../store/reducers/root';

type BusesProps = {

};

const Buses: React.FC<BusesProps> = () => {
	const history = useHistory();
	const buses = useSelector((state: RootState) => state.bus.buses);

	console.log(buses);

	const getBuses = buses.map((bus: any) => [
		bus._id,
		bus.name,
		bus.source,
		bus.destination,
		new Date(bus.startDate).toLocaleDateString() + ' ' + new Date(bus.startDate).toLocaleTimeString(),
		new Date(bus.endDate).toLocaleDateString() + ' ' + new Date(bus.endDate).toLocaleTimeString(),
		bus.totalSeats,
		bus.seats.length,
		bus.fare
	]);

	console.log(getBuses);

	return (
		<React.Fragment>
			<div className='admin__content--head'>
				<FillButton type={1} text='Add Bus' onClickHandler={() => history.push('/admin/dashboard/bus/add')} />
				<FillButton type={2} text='Reset Bus' onClickHandler={() => history.push('/admin/dashboard/bus/reset')} />
			</div>
			<div className='admin__content--body'>
				<Table
					header={['Id', 'Service', 'Source', 'Destination', 'Departure', 'Arrival', 'Capacity', 'Available Seats', 'Fare']}
					rows={getBuses}
					color='#E74E35'
				/>
			</div>
		</React.Fragment>
	);
};
export default Buses;


