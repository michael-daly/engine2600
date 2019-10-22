import Sprite from '~/sprite/Sprite.js';

import { drawFillRect } from '~/utility/fillDraw.js';
import { getColor }     from '~/palettes/palettes.js';

import { PIXEL_WIDTH, PIXEL_HEIGHT }          from '~/core/constants.js';
import { DEFAULT_PLAYER_X, DEFAULT_PLAYER_Y } from '~/player/constants.js';


class Player
{
	/**
	 * @param {Sprite|null} sprite
	 */
	constructor ( sprite = null )
	{
		this.sprite  = sprite;
		this.x       = DEFAULT_PLAYER_X;
		this.y       = DEFAULT_PLAYER_Y;
		this.flipX   = false;
		this.flipY   = false;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;
	}

	/**
	 * Delete all properties and set isDeleted to true.
	 */
	delete ()
	{
		delete this.sprite;
		delete this.x;
		delete this.y;
		delete this.flipX;
		delete this.flipY;

		this.isDeleted = true;
	}

	/**
	 * @param {Sprite|null} sprite
	 */
	setSprite ( sprite = null )
	{
		this.sprite = sprite;
	}

	/**
	 * Draws the player's sprite on a canvas context.
	 *
	 * @param {CanvasRenderingContext2D} context - The canvas context to draw this on.
	 * @param {string}                   palette - The color palette to draw this with.
	 */
	render ( context, palette )
	{
		const { sprite, x, y, flipX, flipY } = this;

		sprite.forEachPixel (( pixelX, pixelY, pixel ) =>
		{
			if ( pixel === 0 )
			{
				return;
			}

			const rowRGBA = getColor (palette, sprite.getRowColor (pixelY));

			let drawX = pixelX + x;
			let drawY = pixelY + y;

			if ( flipX )
			{
				drawX = (sprite.width - pixelX) - (PIXEL_WIDTH / 2) + x;
			}

			drawFillRect (context, rowRGBA, drawX, pixelY + y, PIXEL_WIDTH, PIXEL_HEIGHT);
		});
	}
}


export default Player;
