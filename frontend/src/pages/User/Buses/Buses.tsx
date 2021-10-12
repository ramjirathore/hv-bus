import React, { useEffect, useState } from 'react'; // React

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setResults } from '../../../store/actions/search';
import { RootState } from '../../../store/reducers/root';

// Components
import BusTile from '../../../components/BusTile/BusTile';
import Filters from '../../../components/Filters/Filters';
import Search from '../../../components/Search/Search';

import { fetchBuses } from '../../../services/buses'; // Service
import Booking from '../Booking/Booking'; // Page

type BusesProps = {

};

const Buses: React.FC<BusesProps> = (props) => {
	const dispatch = useDispatch();
	const busState = useSelector((state: RootState) => state.bus);
	const busList = busState.buses;
	const searchState = useSelector((state: RootState) => state.srch);

	useEffect(() => {
		console.log('buses fetched again!');
	}, [busState.buses]);

	const initBus = { _id: '' };
	const [viewedBus, setViewedBus] = useState(initBus);
	const [viewSeats, setViewSeats] = useState(false);

	const modifySearch = () => {
		if (!busList.length) fetchBuses(dispatch);
		dispatch(setResults(busList, searchState));
	};

	const toggleViewSeats = (busData: any) => {
		if (viewSeats) setViewedBus(initBus);
		else setViewedBus(busData);

		setViewSeats(!viewSeats);
	};

	const getBuses = () => (
		searchState.results.length && searchState.results.map((bus: any) => (
			<div key={bus._id}>
				<BusTile
					service={bus.name}
					departure={bus.source}
					arrival={bus.destination}
					startDate={bus.startDate}
					endDate={bus.endDate}
					fare={bus.fare}
					seatsAvailable={bus.seats.length}
					view={viewSeats && bus._id === viewedBus._id}
					handleViewSeats={() => toggleViewSeats(bus)}
				/>
				{bus._id === viewedBus._id &&
					<Booking
						busId={viewedBus._id}
						seats={bus.seats}
						capacity={bus.totalSeats}
						fare={bus.fare}
					/>
				}
			</div>
		))
	);

	const getSortingHeader = () => (
		<div className='buses__body--results-sort'>
			{/* <h4 className='b b--3 text--bold'>Sort by:</h4> */}
			<h3 className='b b--3'>Service</h3>
			<h3 className='b b--3'>Departure</h3>
			<h3 className='b b--3'>Duration</h3>
			<h3 className='b b--3'>Arrival</h3>
			<h3 className='b b--3 '>Fare</h3>
			<h3 className='b b--3 '>Seats</h3>
		</div>
	);

	const getBusResults = () => (
		searchState.results.length === 0
			? <h2 className='h h--3 text--center u-p-t-b'>No buses found</h2>
			: <div className='buses__body--results-tiles'>{getBuses()}</div>
	);

	return (
		<div className='buses'>
			<div className='buses__head'>
				<Search text='Modify' handleSearch={modifySearch} />
			</div>
			<div className='buses__body'>
				<div className='buses__body--filters'><Filters /></div>
				<div className='buses__body--results'>
					{getSortingHeader()}
					{getBusResults()}
				</div>
			</div>
		</div>
	);
};
export default Buses;;