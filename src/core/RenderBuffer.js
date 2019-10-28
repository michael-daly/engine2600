import { setPixel } from '~/utility/imageData.js';


class RenderBuffer
{
	/**
	 * @param {integer} width
	 * @param {integer} height
	 */
	constructor ( width, height )
	{
		this.imageData = new ImageData (width, height);
		this.width     = width;
		this.height    = height;
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
		if ( x < 0  ||  y < 0  ||  x >= this.width  ||  y >= this.height )
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
