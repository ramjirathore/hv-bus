import React, { useEffect, useState } from 'react'; // React
import { useHistory } from 'react-router'; // Routing
import { useDispatch, useSelector } from 'react-redux'; // Redux
import { doLogin } from '../../../services/auth'; // Service

// Components
import Switch from '../../../components/Switch/Switch';
import Row from '../../../components/Row/Row';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import Backdrop from '../../../components/Backdrop/Backdrop';
import FillButton from '../../../components/Button/Fill';

// Assets
import hvlogo from '../../../assets/logos/hvbus-logo.png';

import { RootState } from '../../../store/reducers/root';

type LoginProps = {

};

// Color for switch
const offColor = '#4285F4';
const onColor = '#0F9D58';


const Login: React.FC<LoginProps> = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const userState = useSelector((state: RootState) => state.user);

	const [isAdmin, setIsAdmin] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [open, setOpen] = useState(true);

	useEffect(() => {
		console.log('rerender login');
	}, [userState.error]);

	const handleClose = () => {
		setOpen(false);
		history.push('/');
	};

	const handleLogin = () => {
		doLogin(email, password, isAdmin, dispatch, history);
	};

	const getBody = () => (
		<React.Fragment>
			<Input type='text' placeholder='Enter email' value={email} handleInput={(val: string) => setEmail(val)} />
			<Input type='password' placeholder='Enter password' value={password} handleInput={(val: string) => setPassword(val)} />
			{userState.error.length > 0 && <h1 className='u-m-v-s b b--3 a--danger'>{userState.error}</h1>}
			<Row jc='sa' extraStyle='u-m-v-m'>
				<FillButton text='Login' type={1} extraStyle="d__w--40" onClickHandler={handleLogin} />
				<FillButton text='Cancel' type={2} extraStyle="d__w--40" onClickHandler={handleClose} />
			</Row>
		</React.Fragment>
	);

	return (
		<Backdrop open={open}>
			<div className='login card' >
				<div className='login__head'>
					<Icon src={hvlogo} alt='HVbus logo' size='l' />
				</div>
				<div className='login__body'>
					<h1 className='h h--2 u-m-b-xs'>Sign In</h1>
					<h1 className='b b--3 text--disabled u-m-b-m'>Enter your credentials and start booking!</h1>
					<div className='d--f jc--c u-m-v-s'>
						<Switch
							isOn={isAdmin}
							handleToggle={() => setIsAdmin(!isAdmin)}
							offColor={offColor}
							onColor={onColor}
							left='User'
							right='Admin' />
					</div>
					{getBody()}
					<h4 className='b c--2'>
						Don't have an account?
						<span onClick={() => history.push('/register')}>
							Sign Up
						</span>
					</h4>
				</div>
			</div>
		</Backdrop >
	);
};

export default Login;