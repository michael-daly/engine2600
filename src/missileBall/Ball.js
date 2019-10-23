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
	 * @param {CanvasRenderingContext2D} context    - The canvas context to draw this on.
	 * @param {string}                   palette    - The color palette to draw this with.
	 * @param {integer}                  colorIndex - The color index to draw this with.
	 */
	render ( context, palette, colorIndex )
	{
		const { width, height, x, y } = this;

		const ballRGBA   = getColor (palette, colorIndex);
		const drawWidth  = (BALL_MUL_WIDTH  * width);
		const drawHeight = 1;

		drawFillRect (context, ballRGBA, x, y, drawWidth, drawHeight);
	}
}


export default Ball;
