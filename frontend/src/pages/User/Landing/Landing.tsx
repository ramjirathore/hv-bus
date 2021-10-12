import React, { useEffect } from 'react'; // React
import { useHistory } from 'react-router'; // Routing

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setResults } from '../../../store/actions/search';
import { RootState } from '../../../store/reducers/root';

import { fetchBuses } from '../../../services/buses'; // Service
import Search from '../../../components/Search/Search'; // Component
import busbg from '../../../assets/images/bus-bg.png'; // Asset

type landingProps = {
	name?: string;
};

const Landing: React.FC<landingProps> = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const busState = useSelector((state: RootState) => state.bus);
	const searchState = useSelector((state: RootState) => state.srch);

	// fetch all buses initially
	useEffect(() => {
		fetchBuses(dispatch);
	}, []);

	const handleSearch = async () => {
		dispatch(setResults(busState.buses, searchState));
		history.push('/buses/search');
	};

	return (
		<div className='landing'>
			<div className='landing__search'>
				<h1 className='d--2 u-t-c h--white u-m-b-m'>Book Bus Tickets</h1>
				<Search text='Search' handleSearch={handleSearch} />
			</div>
			<img src={busbg} alt='bus image' className='landing__bg' />
		</div>
	);
};
export default Landing;