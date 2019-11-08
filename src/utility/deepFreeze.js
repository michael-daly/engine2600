/**
 * Recursively freeze an object/array.
 *
 * @param   {Object|Array} objectOrArray
 * @returns {Object|Array} The frozen object/array.
 */
const deepFreeze = objectOrArray =>
{
	if ( Array.isArray (objectOrArray) )
	{
		const length = objectOrArray.length;

		for ( let i = 0;  i < length;  i++ )
		{
			deepFreeze (objectOrArray[i]);
		}
	}

	if ( typeof objectOrArray === 'object' )
	{
		for ( let i in objectOrArray )
		{
			deepFreeze (objectOrArray[i]);
		}
	}

	return Object.freeze (objectOrArray);
};


export default deepFreeze;
