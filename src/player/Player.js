import GridRow from '~/core/GridRow.js';

import { getColor } from '~/palettes/palettes.js';

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

		this.color = color;

		// For the Atari 2600, there is only an image buffer for a single scanline, so if we want
		// to draw a sprite, we have to change the buffer manually each scanline.
		this.graphics = new GridRow (PLAYER_WIDTH);
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
	 * Converts a scanline X coordinate to a pixel value.
	 *
	 * @param   {integer} coordX
	 * @returns {-1|0|1} -1 if coordinate is not where player is being drawn.
	 */
	coordToPixel ( coordX )
	{
		return this.getPixel (coordX - this.x);
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
