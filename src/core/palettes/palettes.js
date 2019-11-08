import has from 'has';

import NTSC  from '~/palettes/NTSC.js';
import PAL   from '~/palettes/PAL.js';
import SECAM from '~/palettes/SECAM.js';

const palettes = Object.freeze ({ NTSC, PAL, SECAM });

/**
 * An integer array representing an RGBA color.
 *
 * @typedef {integer[]} ColorRGBA
 */

/**
 * Get an RGBA color array at an index in a specific palette.
 *
 * @param {"NTSC"|"PAL"|"SECAM"} paletteName
 * @param {integer}              colorIndex
 *
 * @returns {ColorRGBA|null} RGBA color array, or null if invalid color index/palette.
 */
const getColor = ( paletteName, colorIndex ) =>
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

export default palettes;
