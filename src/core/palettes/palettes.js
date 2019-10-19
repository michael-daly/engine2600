import has from 'has';

import NTSC       from '~/core/palettes/NTSC.js';
import PAL        from '~/core/palettes/PAL.js';
import SECAM      from '~/core/palettes/SECAM.js';
import deepFreeze from '~/utility/deepFreeze.js';

const palettes = deepFreeze ({ NTSC, PAL, SECAM });

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

/**
 * Get the max number of colors in a palette.
 *
 * @param {string} paletteName - Available palettes: NTSC, PAL, and SECAM.
 *
 * @returns {integer}
 */
const getMaxColors = ( paletteName = 'NTSC' ) =>
{
	if ( !has (palettes, paletteName) )
	{
		return -1;
	}

	return palettes[paletteName].length;
};


export default palettes;
export { getColor, getMaxColors };
