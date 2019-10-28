/**
 * Create an array of a certain size, filled with a value or whatever values the callback returns.
 *
 * @param {integer}  size
 * @param {*}        callbackOrValue - If it's a callback, the arguments are (index, array)
 */
const createArray = ( size, callbackOrValue ) =>
{
	const arr = new Array (size);

	for ( let i = 0;  i < size;  i++ )
	{
		if ( typeof callbackOrValue === 'function' )
		{
			arr[i] = callbackOrValue (i, arr);
		}
		else
		{
			arr[i] = callbackOrValue;
		}
	}

	return arr;
};


export { createArray };
