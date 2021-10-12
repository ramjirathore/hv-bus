import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Row from '../../../components/Row/Row';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import Backdrop from '../../../components/Backdrop/Backdrop';
import FillButton from '../../../components/Button/Fill';
import { doAddBus } from '../../../services/admin';

import hvlogo from '../../../assets/logos/hvbus-logo.png';

type AddBusProps = {

};


const AddBus: React.FC<AddBusProps> = () => {
	const history = useHistory();

	const [open, setOpen] = useState(true);
	const [busData, setBusData] = useState({
		source: '',
		destination: '',
		totalSeats: '',
		name: '',
		startDate: '',
		endDate: '',
		fare: 0
	});

	const handleAdd = () => {
		doAddBus(busData);
		history.goBack();
	};

	const handleBusData = (type: string, val: string | number | Date) => {
		setBusData({ ...busData, [type]: val });
	};

	const handleClose = () => {
		setOpen(false);
		history.goBack();
	};

	return (
		<Backdrop open={open}>
			<div className='login card' >
				<div className='login__head'>
					<Icon src={hvlogo} alt='HVbus logo' size='l' />
				</div>

				<div className='login__body'>
					<h1 className='h h--3 u-m-b-xs'>Add Bus</h1>

					<Input value={busData.name} type='text' placeholder='Service Name' handleInput={(val: string) => handleBusData('name', val)} />
					<Input value={busData.source} type='text' placeholder='Source' handleInput={(val: string) => handleBusData('source', val)} />
					<Input value={busData.destination} type='text' placeholder='Destination' handleInput={(val: string) => handleBusData('destination', val)} />
					<Input value={busData.fare} type='number' placeholder='Fare' handleInput={(val: number) => handleBusData('fare', val)} />
					<Input value={busData.totalSeats} type='number' placeholder='Capacity' handleInput={(val: number) => handleBusData('totalSeats', val)} />
					<Input value={busData.startDate} type='datetime-local' placeholder='Departure At' handleInput={(val: Date) => handleBusData('startDate', val)} />
					<Input value={busData.endDate} type='datetime-local' placeholder='Arrival At' handleInput={(val: Date) => handleBusData('endDate', val)} />
					<Row jc='sa' extraStyle='u-m-v-m'>
						<FillButton text='Add' type={1} extraStyle="d__w--40" onClickHandler={handleAdd} />
						<FillButton text='Cancel' type={2} extraStyle="d__w--40" onClickHandler={handleClose} />
					</Row>
				</div>
			</div>
		</Backdrop>
	);
};
export default AddBus;
