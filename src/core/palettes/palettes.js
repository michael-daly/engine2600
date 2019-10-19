import NTSC from '~/core/palettes/NTSC.js';


/**
 * Get an RGBA color array at an index in the palette.
 *
 * @param   {integer}        colorIndex
 * @returns {integer[]|null} RGBA color array, or null if invalid color index.
 */
const getColor = ( colorIndex ) =>
{
	if ( colorIndex < 0  ||  colorIndex >= NTSC.length )
	{
		return null;
	}

	return NTSC[colorIndex];
};


export { getColor };
