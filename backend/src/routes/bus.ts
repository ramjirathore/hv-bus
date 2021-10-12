
import express from "express";
import busController from '../controllers/bus.controller';
import auth from '../middleware/auth';

const router = express.Router();


router.post('/add-bus', auth.authenticateToken, auth.restrictTo('admin'), busController.addBus);
router.patch('/reset-bus/:busId', auth.authenticateToken, auth.restrictTo('admin'), busController.resetBus);

router.get('/get-bus/:busId', auth.authenticateToken, busController.getBus);
router.get('/get-buses', auth.authenticateToken, busController.getAllBuses);
router.get('/view-empty-seats/:busId', auth.authenticateToken, busController.viewEmtpySeats);

export = router;