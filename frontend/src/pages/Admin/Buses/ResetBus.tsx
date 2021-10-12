import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Row from '../../../components/Row/Row';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import Backdrop from '../../../components/Backdrop/Backdrop';
import FillButton from '../../../components/Button/Fill';
import hvlogo from '../../../assets/logos/hvbus-logo.png';

import { doReset } from '../../../services/admin';

type ResetBusProps = {

};

const ResetBus: React.FC<ResetBusProps> = () => {
	const history = useHistory();

	const [busId, setBusId] = useState("");
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
		history.goBack();
	};

	const handleReset = async () => {
		await doReset(busId);
		history.goBack();
	};

	return (
		<Backdrop open={open}>
			<div className='login card' >
				<div className='login__head'>
					<Icon src={hvlogo} alt='HVbus logo' size='l' />
				</div>
				<div className='login__body'>
					<h1 className='h h--2 u-m-b-xs'>Reset Bus</h1>
					<Input type='text' placeholder='Enter Bus Id' value={busId} handleInput={(val: string) => setBusId(val)} />
					<Row jc='sa' extraStyle='u-m-v-m'>
						<FillButton text='Reset' type={1} extraStyle="d__w--40" onClickHandler={handleReset} />
						<FillButton text='Cancel' type={2} extraStyle="d__w--40" onClickHandler={handleClose} />
					</Row>
				</div>
			</div>
		</Backdrop >
	);
};

export default ResetBus;