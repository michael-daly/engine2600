import GridRow from '~/core/GridRow.js';

import { getColor }    from '~/palettes/palettes.js';
import { PIXEL_WIDTH } from '~/core/constants.js';

import { PLAYER_WIDTH, DEF_PLAYER_COL, DEF_PLAYER_X } from '~/player/constants.js';


class Player
{
	/**
	 * @param {integer} x
	 * @param {integer} color
	 */
	constructor ( x = DEF_PLAYER_X, color = DEF_PLAYER_COL )
	{
		this._x = x;

		this.graphics = new GridRow (PLAYER_WIDTH);
		this.color    = color;
	}

	/**
	 * @param   {integer} index
	 * @returns {0|1}
	 */
	getPixel ( index )
	{
		return this.graphics.getBlock (index);
	}

	/**
	 * Used for changing player graphics.
	 *
	 * @param {integer} index
	 * @param {0|1}     bool
	 */
	setPixel ( index, bool )
	{
		this.graphics.setBlock (index, bool);
	}

	/**
	 * @param {RenderBuffer} renderBuffer
	 * @param {string}       palette
	 * @param {integer}      scanline
	 */
	render ( renderBuffer, palette, scanline )
	{
		const { graphics, color, x } = this;

		const colorRGBA = getColor (palette, color);

		graphics.forEach (( pixelX, pixel ) =>
		{
			if ( pixel )
			{
				const drawX = x + (pixelX * PIXEL_WIDTH);

				renderBuffer.drawHorizontalLine (drawX, scanline, PIXEL_WIDTH, colorRGBA);
			}
		});
	}

	get x ()
	{
		return this._x;
	}

	set x ( x )
	{
		this._x = Math.round (x);
	}
}


export default Player;
