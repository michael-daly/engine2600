const logMessage = ( type = 'log', ...args ) =>
{
	console[type] (...args);
};

const Logger =
{
	log ( ...args )
	{
		logMessage ('log', ...args);
	},

	warn ( ...args )
	{
		logMessage ('warn', ...args);
	},

	error ( ...args )
	{
		logMessage ('error', ...args);
	},
};


export default Logger;
