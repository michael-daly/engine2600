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

	/**
	 * @param {integer}   x
	 * @param {integer}   y
	 * @param {integer}   width
	 * @param {ColorRGBA} colorRGBA
	 */
	drawHorizontalLine ( x, y, width, colorRGBA )
	{
		for ( let drawX = x;  drawX < x + width;  drawX++ )
		{
			this.drawPixel (drawX, y, colorRGBA);
		}
	}
}


export default RenderBuffer;
