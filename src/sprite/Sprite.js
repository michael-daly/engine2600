import deepFreeze from '~/utility/deepFreeze.js';

import { MAX_SPRITE_WIDTH, MAX_SPRITE_HEIGHT } from '~/sprite/constants.js';


/**
 * A read-only class for rendering player sprites.
 */
class Sprite
{
	/**
	 * @param {Object[]} pixelData - [{ rowColor: 0, rowPixels: [...] }, ...]
	 */
	constructor ( pixelData = [] )
	{
		const height = pixelData.length;
		const width  = pixelData[0].rowPixels.length;

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

		if ( height > MAX_SPRITE_HEIGHT )
		{
			throw new Error (`Sprite cannot be higher than ${MAX_SPRITE_HEIGHT} pixel(s)`);
		}

		/* These are all static properties -- don't change them. */

		this.width  = width;
		this.height = height;
		this.pixels = deepFreeze (pixelData);
	}

	/**
	 * Call callback on each pixel.
	 *
	 * @param {Function} callback - (x, y, pixel)
	 */
	forEachPixel ( callback )
	{
		const { height, width, pixels } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			const { rowPixels } = pixels[y];

			for ( let x = 0;  x < width;  x++ )
			{
				callback (x, y, rowPixels[x]);
			}
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

		if ( y < 0  ||  y >= MAX_SPRITE_HEIGHT )
		{
			return -1;
		}

		return this.pixels[y].rowPixels[x];
	}

	/**
	 * Get row pixel color index.
	 *
	 * @param   {integer} rowIndex
	 * @returns {integer}
	 */
	getRowColor ( rowIndex )
	{
		return this.pixels[rowIndex].rowColor;
	}
}


export default Sprite;
