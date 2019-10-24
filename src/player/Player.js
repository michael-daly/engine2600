import Sprite from '~/player/Sprite.js';

import { DEFAULT_PLAYER_X, DEFAULT_PLAYER_Y, DEFAULT_PLAYER_COL } from '~/player/constants.js';

import { PIXEL_WIDTH, PIXEL_HEIGHT } from '~/core/constants.js';

import { drawFillRect } from '~/utility/fillDraw.js';
import { getColor }     from '~/palettes/palettes.js';


class Player
{
	/**
	 * @param {Sprite} [sprite]
	 */
	constructor ( sprite = null )
	{
		this.sprite = sprite;
		this.color  = DEFAULT_PLAYER_COL;
		this.x      = DEFAULT_PLAYER_X;
		this.y      = DEFAULT_PLAYER_Y;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;
	}

	/**
	 * Delete all properties and set isDeleted to true.
	 */
	delete ()
	{
		delete this.sprite;
		delete this.color;
		delete this.x;
		delete this.y;

		this.isDeleted = true;
	}

	/**
	 * Draws the player's sprite on a canvas context.
	 *
	 * @param {CanvasRenderingContext2D} context  - The canvas context to draw this on.
	 * @param {string}                   palette  - The color palette to draw this with.
	 * @param {integer}                  scanline - The scanline we're currently rendering.
	 */
	render ( context, palette, scanline )
	{
		const { sprite, color, x, y } = this;

		if ( sprite === null  ||  scanline < y  ||  scanline >= y + sprite.height )
		{
			return;
		}

		const colorRGBA = getColor (palette, color);

		sprite.forEach (scanline - y, ( pixelX, pixel ) =>
		{
			if ( pixel )
			{
				drawFillRect (context, colorRGBA, pixelX + x, scanline, PIXEL_WIDTH, PIXEL_HEIGHT);
			}
		});
	}
}


export default Player;
