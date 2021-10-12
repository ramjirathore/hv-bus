import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import logging from './config/logging';
import config from './config/config';

import busRoutes from './routes/bus';
import ticketRoutes from './routes/ticket';
import userRoutes from './routes/user';

import { errorHandler } from './middleware/errorHandler';

const NAMESPACE = 'App';
const app = express();

// express.urlencoded({ extended: true });
// express.json();

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(bodyParser.json());

app.use(express.json());


/** Connect to Mongo */
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then(() => {
		logging.info(NAMESPACE, 'Mongo Connected!');
	})
	.catch((error) => {
		logging.error(NAMESPACE, error.message, error);
	});


/** Rules of our API */
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}

	next();
});


/** Routes */
app.use('/api', busRoutes);
app.use('/api', ticketRoutes);
app.use('/api', userRoutes);


/**error handling middleware */
app.use(errorHandler);

app.listen(config.server.port, (): void => {
	console.log(`Server is running on ${config.server.port}!`);
});

