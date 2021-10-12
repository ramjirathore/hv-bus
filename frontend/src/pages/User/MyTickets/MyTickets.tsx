import React, { useEffect, useState } from 'react'; // React
import { Grid } from '@material-ui/core'; // Material-UI
import Ticket from '../../../components/Ticket/Ticket'; // Component
import { cancelTicket, fetchMyTickets } from '../../../services/booking'; // Service
import { fetchBuses } from '../../../services/buses';
import { useDispatch } from 'react-redux';

type MyTicketsProps = {

};

const MyTickets: React.FC<MyTicketsProps> = () => {
	const [tickets, setTickets] = useState([]);
	const dispatch = useDispatch();

	// Start by fetching all tickets first
	useEffect(() => {
		handleFetchTickets();
	}, []);

	const handleFetchTickets = async () => {
		const mytickets = await fetchMyTickets();
		setTickets(mytickets);
	};

	const handleCancelTicket = async (ticketId: string) => {
		await cancelTicket(ticketId);
		await fetchBuses(dispatch);
		handleFetchTickets();
	};

	const getAllTickets = () => (
		<Grid container spacing={3}>
			{tickets.length ? tickets.map((ticket: any) =>
				<Grid key={ticket._id} item xs={12} md={6} lg={4}>
					<Ticket id={ticket._id} name={ticket.name} seatNo={ticket.seatNumber} status={ticket.status} handleCancel={() => handleCancelTicket(ticket._id)} />
				</Grid>
			) :
				<Grid item lg={12}>
					<div className='d--f jc--c'>
						<h3 className='b b--2'>No tickets found</h3>
					</div>
				</Grid>
			}
		</Grid>
	);

	return (
		<div className='mytickets'>
			<div className='mytickets__profile'>User Profile Coming soon!</div>
			<div className='mytickets__container'>
				<h2 className='h h--2'>My Tickets</h2>
				<div className='mytickets__container--tickets'>
					{getAllTickets()}
				</div>
			</div>
		</div>
	);
};
export default MyTickets;