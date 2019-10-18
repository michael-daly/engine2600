const createArray = ( length, callback ) =>
{
	const arr = new Array (length);

	for ( let i = 0;  i < length;  i++ )
	{
		arr[i] = callback (i, arr);
	}

	return arr;
};


export { createArray };
