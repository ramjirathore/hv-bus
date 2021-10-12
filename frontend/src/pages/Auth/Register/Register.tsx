
import React, { useState } from 'react'; // React
import { useHistory } from 'react-router'; // Routing

// Components
import Switch from '../../../components/Switch/Switch';
import Row from '../../../components/Row/Row';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import Backdrop from '../../../components/Backdrop/Backdrop';
import FillButton from '../../../components/Button/Fill';

import { doRegister } from '../../../services/auth'; // Service
import hvlogo from '../../../assets/logos/hvbus-logo.png'; // Asset
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/root';


type RegisterProps = {

};


// Color for switch
const offColor = '#4285F4';
const onColor = '#0F9D58';


const Register: React.FC<RegisterProps> = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const userState = useSelector((state: RootState) => state.user);
	const [isAdmin, setIsAdmin] = useState(false);
	const [open, setOpen] = useState(true);
	const [signupData, setSignupData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		age: ''
	});

	const handleSignup = () => {
		doRegister(signupData, isAdmin, dispatch, history);
	};

	const handleUserData = (type: string, val: string | number) => {
		setSignupData({ ...signupData, [type]: val });
	};

	const handleClose = () => {
		setOpen(false);
		history.push('/');
	};

	const getBody = () => (
		<React.Fragment>
			<Input value={signupData.firstName} type='text' placeholder='First Name' handleInput={(val: string) => handleUserData('firstName', val)} />
			<Input value={signupData.lastName} type='text' placeholder='Last Name' handleInput={(val: string) => handleUserData('lastName', val)} />
			<Input value={signupData.email} type='email' placeholder='Email' handleInput={(val: string) => handleUserData('email', val)} />
			<Input value={signupData.password} type='password' placeholder='Password' handleInput={(val: string) => handleUserData('password', val)} />
			<Input value={signupData.age} type='number' placeholder='Age' handleInput={(val: number) => handleUserData('age', val)} />
		</React.Fragment>
	);

	return (
		<Backdrop open={open}>
			<div className='login card' >
				<div className='login__head'>
					<Icon src={hvlogo} alt='HVbus logo' size='l' />
				</div>

				<div className='login__body'>
					<h1 className='h h--3 u-m-b-xs'>Sign Up</h1>
					<h1 className='b b--3 text--disabled u-m-b-m'>Enter your details and let's get started!</h1>
					<div className='d--f jc--c u-m-v-s'>
						<Switch
							isOn={isAdmin}
							handleToggle={() => setIsAdmin(!isAdmin)}
							offColor={offColor}
							onColor={onColor}
							left='User'
							right='Admin'
						/>
					</div>
					{getBody()}
					{userState.error.length > 0 && <h1 className='u-m-v-s b b--3 a--danger'>{userState.error}</h1>}
					<Row jc='sa' extraStyle='u-m-v-m'>
						<FillButton text='Register' type={1} extraStyle="d__w--40" onClickHandler={handleSignup} />
						<FillButton text='Cancel' type={2} extraStyle="d__w--40" onClickHandler={handleClose} />
					</Row>
					<h4 className='b c--2'>Already have an account? <span onClick={() => history.push('/login')}>Sign In</span></h4>
				</div>
			</div>
		</Backdrop>
	);
};
export default Register;
