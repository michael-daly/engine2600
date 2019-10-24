import
{
	VALID_WIDTHS,

	DEFAULT_BALL_WIDTH,
	DEFAULT_BALL_HEIGHT,
	DEFAULT_BALL_X,
	DEFAULT_BALL_Y,

	BALL_MUL_WIDTH,
	BALL_MUL_HEIGHT,
	BALL_ADD_HEIGHT,
}
from '~/missileBall/constants.js';

import { PIXEL_WIDTH, PIXEL_HEIGHT } from '~/core/constants.js';

import { drawFillRect } from '~/utility/fillDraw.js';
import { getColor }     from '~/palettes/palettes.js';


class Ball
{
	/**
	 * @param {integer} width  - 1, 2, 4, or 8.
	 * @param {integer} height - Heights are arbitrary.
	 */
	constructor ( width = DEFAULT_BALL_WIDTH, height = DEFAULT_BALL_WIDTH )
	{
		if ( VALID_WIDTHS.indexOf (width) < 0 )
		{
			throw new Error ('Invalid ball width');
		}

		this.width  = width;
		this.height = height;
		this.x      = DEFAULT_BALL_X;
		this.y      = DEFAULT_BALL_Y;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;
	}

	/**
	 * Delete all properties and set isDeleted to true.
	 */
	delete ()
	{
		delete this.width;
		delete this.height;
		delete this.x;
		delete this.y;

		this.isDeleted = true;
	}

	/**
	 * Draws the player's sprite on a canvas context.
	 *
	 * @param {CanvasRenderingContext2D} context   - The canvas context to draw this on.
	 * @param {integer[]}                colorRGBA - The RGBA color to draw this as.
	 * @param {integer}                  scanline  - The scanline we're currently rendering.
	 */
	render ( context, colorRGBA, scanline )
	{
		const { width, height, x, y } = this;

		if ( width <= 0  ||  height <= 0  ||  scanline < y  ||  scanline >= y + height )
		{
			return;
		}

		const drawWidth  = (width * BALL_MUL_WIDTH);
		const drawHeight = 1;

		drawFillRect (context, colorRGBA, x, scanline, drawWidth, drawHeight);
	}
}


export default Ball;
