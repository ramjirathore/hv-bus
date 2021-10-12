import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Buses from './Buses/Buses';
import Users from './Users/Users';

import { fetchBuses } from '../../services/buses';

type DashboardProps = {

};

const Dashboard: React.FC<DashboardProps> = () => {
	const dispatch = useDispatch();

	const [selected, setSelected] = useState(1);
	const [classes, setClasses] = useState(['b b--2', 'b b--2']);

	useEffect(() => {
		const updatedClasses = [...classes];
		updatedClasses[selected] += ' admin__options--selected';
		setClasses(updatedClasses);

		fetchBuses(dispatch);
	}, []);

	console.log(selected);

	const handleSelected = (index: number) => {
		const lastIndex = selected;
		// set new Selected
		setSelected(index);

		const newClass = [...classes];
		// swap classes
		[newClass[index], newClass[lastIndex]] = [newClass[lastIndex], newClass[index]];

		setClasses(newClass);
	};

	const getSelectedComponent = () => {
		switch (selected) {
			case 0: return <Users />;
			case 1: return <Buses />;
		}
	};

	return (
		<div className='admin'>
			<div className='admin__options'>
				<h2 className={classes[0]} onClick={() => handleSelected(0)}>Users</h2>
				<h2 className={classes[1]} onClick={() => handleSelected(1)}>Buses</h2>
			</div>
			<div className='admin__content'>
				{getSelectedComponent()}
			</div>
		</div>
	);
};
export default Dashboard;