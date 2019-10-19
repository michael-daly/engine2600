import NTSC from '~/core/palettes/NTSC.js';


const getColor = ( colorIndex ) =>
{
	if ( colorIndex < 0  ||  colorIndex >= NTSC.length )
	{
		return null;
	}

	return NTSC[colorIndex];
};


export { getColor };
