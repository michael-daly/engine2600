import deepFreeze from '~/utility/deepFreeze.js';

import { MAX_SPRITE_WIDTH } from '~/player/constants.js';


/**
 * A read-only class for rendering player sprites.
 */
class Sprite
{
	/**
	 * @param {Array[]} pixelData - [ [ ... ], ... ]
	 */
	constructor ( pixelData )
	{
		const height = pixelData.length;
		const width  = pixelData[0].length;

		if ( width < 1 )
		{
			throw new Error (`Sprite must be at least 1 pixel wide`);
		}

		if ( width > MAX_SPRITE_WIDTH )
		{
			throw new Error (`Sprite cannot be wider than ${MAX_SPRITE_WIDTH} pixel(s)`);
		}

		if ( height < 1 )
		{
			throw new Error (`Sprite must be at least 1 pixel high`);
		}

		/* These are all static properties -- don't change them. */

		this.width  = width;
		this.height = height;
		this.pixels = deepFreeze (pixelData);
	}

	/**
	 * Call a callback on each pixel in a row.
	 *
	 * @param {integer}  rowIndex
	 * @param {Function} callback - (x, pixel)
	 */
	forEach ( rowIndex, callback )
	{
		const { width, height, pixels } = this;

		if ( rowIndex < 0  ||  rowIndex >= height )
		{
			return;
		}

		const row = pixels[rowIndex];

		for ( let x = 0;  x < width;  x++ )
		{
			callback (x, row[x]);
		}
	}

	/**
	 * Get the pixel bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 *
	 * @returns {-1|0|1} The pixel bit at (x, y) or -1 if the pixel is out of bounds.
	 */
	getPixel ( x, y )
	{
		if ( x < 0  ||  x >= MAX_SPRITE_WIDTH )
		{
			return -1;
		}

		if ( y < 0 )
		{
			return -1;
		}

		return this.pixels[y][x];
	}
}


export default Sprite;
