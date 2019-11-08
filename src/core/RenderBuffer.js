import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';

import { setPixel } from '~/utility/imageData.js';


/**
 * Used by the TIAVideo class for drawing pixels and storing image data.
 */
class RenderBuffer
{
	constructor ()
	{
		this.imageData = new ImageData (CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	/**
	 * Sets a pixel's color at (x, y), provided it's a valid coordinate.
	 *
	 * @param {integer}   x
	 * @param {integer}   y
	 * @param {ColorRGBA} colorRGBA
	 */
	drawPixel ( x, y, colorRGBA )
	{
		if ( x < 0  ||  y < 0  ||  x >= CANVAS_WIDTH  ||  y >= CANVAS_HEIGHT )
		{
			return;
		}

		setPixel (this.imageData, x, y, colorRGBA);
	}
}


export default RenderBuffer;
