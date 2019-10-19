import has from 'has';

import NTSC  from '~/core/palettes/NTSC.js';
import PAL   from '~/core/palettes/PAL.js';
import SECAM from '~/core/palettes/SECAM.js';

const palettes = { NTSC, PAL, SECAM };

/**
 * Get an RGBA color array at an index in a specific palette.
 *
 * @param {string}  paletteName - Available palettes: NTSC, PAL, and SECAM.
 * @param {integer} colorIndex
 *
 * @returns {integer[]|null} RGBA color array, or null if invalid color index/palette.
 */
const getColor = ( paletteName = 'NTSC', colorIndex ) =>
{
	if ( !has (palettes, paletteName) )
	{
		return null;
	}

	const palette = palettes[paletteName];

	if ( colorIndex < 0  ||  colorIndex >= palette.length )
	{
		return null;
	}

	return palette[colorIndex];
};


export { getColor };
