import React from 'react';
import IconContainer from '../Icon/Container/Container';
import downloadIcon from '../../assets/icons/download-white-icon.png';
import cancelTicket from '../../assets/icons/cancel-ticket-icon.png';

type TicketProps = {
	id?: string,
	name: string,
	seatNo: number,
	status: string;
	handleCancel: React.MouseEventHandler<HTMLDivElement>;
};

const Ticket: React.FC<TicketProps> = (props) => {
	const { id, name, seatNo, status, handleCancel } = props;

	const getTrip = () => (
		<div>
			<div className='ticket__src'>
				<div className='ticket__dot ticket__dot--red' />
				<div>
					<h2 className='h h--2'>18:30</h2>
					<h2 className='a a--2'>29 Sept</h2>
					<h2 className='b b--2 a--danger'>Delhi</h2>
				</div>
			</div>
			<div className='ticket__line' />
			<div className='ticket__dest'>
				<div className='ticket__dot ticket__dot--blue' />
				<div>
					<h2 className='h h--2'>22:00</h2>
					<h2 className='a a--2'>30 Sept</h2>
					<h2 className='b b--2 a--info'>Jaipur</h2>
				</div>
			</div>
		</div>
	);

	return (
		<div className='ticket'>
			<div className='ticket__id'><h2 className='b b--3 text--bold'>{id}</h2></div>
			<div className='ticket__info'>
				{getTrip()}
				<div>
					<h2 className='h h--3'>{name}</h2>
					<div className='ticket__info--seat'>
						<h2 className='h h--4'>seat - {seatNo}</h2>
					</div>
					{status === 'Confirmed'
						? (
							<React.Fragment>
								<div className='b b--3 ticket__info--confirmed'>Confirmed</div>
								<div className='ticket__info--icons d--f ai--c jc--sb'>
									<IconContainer
										src={cancelTicket}
										size='xs'
										color='#ff004e'
										alt='cancel icon'
										onClickHandler={handleCancel} />
									<IconContainer
										src={downloadIcon}
										size='xs'
										color='#0F9D58'
										alt='download icon'
										onClickHandler={() => console.log('download ', id)} />
								</div>
							</React.Fragment>
						)
						: <div className='b b--3 b--white ticket__info--cancelled'>Cancelled</div>
					}
				</div>
			</div>
		</div>
	);
};
export default Ticket;