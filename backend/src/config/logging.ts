const getTimeStamp = (): string => {
	return new Date().toISOString();
};

// for info logs
const info = (namespace: string, message: string, obj?: any): void => {
	if (obj) {
		console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, obj);
	} else {
		console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
	}
};

// for warn logs
const warn = (namespace: string, message: string, obj?: any): void => {
	if (obj) {
		console.info(`[${getTimeStamp()}] [WARNING] [${namespace}] ${message}`, obj);
	} else {
		console.info(`[${getTimeStamp()}] [WARNING] [${namespace}] ${message}`);
	}
};

// for error logs
const error = (namespace: string, message: string, obj?: any): void => {
	if (obj) {
		console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, obj);
	} else {
		console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
	}
};

// for debug logs
const debug = (namespace: string, message: string, obj?: any): void => {
	if (obj) {
		console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, obj);
	} else {
		console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
	}
};


export default { info, warn, error, debug };