/**
 * Create an array of a certain size, filled with whatever values the callback returns.
 *
 * @param {integer}  size
 * @param {Function} callback - (index, array)
 */
const createArray = ( size, callback ) =>
{
	const arr = new Array (size);

	for ( let i = 0;  i < size;  i++ )
	{
		arr[i] = callback (i, arr);
	}

	return arr;
};


export { createArray };
