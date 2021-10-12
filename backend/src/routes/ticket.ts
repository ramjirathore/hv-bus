
import express from "express";
import ticketController from '../controllers/ticket.controller';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/get-tickets/:busId', auth.authenticateToken, auth.restrictTo('admin'), ticketController.getAllTickets);

router.get('/my-tickets', auth.authenticateToken, ticketController.myTickets);
router.post('/book-ticket', auth.authenticateToken, ticketController.bookTicket);
router.post('/cancel-ticket/:ticketId', auth.authenticateToken, ticketController.cancelTicket);

export = router;