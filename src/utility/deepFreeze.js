const deepFreeze = object =>
{
	if ( Array.isArray (object) )
	{
		const length = object.length;

		for ( let i = 0;  i < length;  i++ )
		{
			deepFreeze (object[i]);
		}
	}
	
	if ( typeof object === 'object' )
	{
		for ( let i in object )
		{
			deepFreeze (object[i]);
		}
	}

	Object.freeze (object);
};


export default deepFreeze;
