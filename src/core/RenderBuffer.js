import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';

import { setPixel } from '~/utility/imageData.js';


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
	 * @param {ColorRGBA} colorArray
	 */
	drawPixel ( x, y, colorArray )
	{
		if ( x < 0  ||  y < 0  ||  x >= CANVAS_WIDTH  ||  y >= CANVAS_HEIGHT )
		{
			return;
		}

		setPixel (this.imageData, x, y, colorArray);
	}

	/**
	 * @param {integer}   x
	 * @param {integer}   y
	 * @param {integer}   width
	 * @param {ColorRGBA} colorArray
	 */
	drawHorizontalLine ( x, y, width, colorArray )
	{
		for ( let drawX = x;  drawX < x + width;  drawX++ )
		{
			this.drawPixel (drawX, y, colorArray);
		}
	}
}


export default RenderBuffer;
