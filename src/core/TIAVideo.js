import RenderBuffer from '~/core/RenderBuffer.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';
import TIAObjects   from '~/core/TIAObjects.js';
import TIACollision from '~/core/TIACollision.js';
import Player       from '~/player/Player.js';
import MissileBall  from '~/missileBall/MissileBall.js';

import { coordToTile } from '~/utility/snapCoord.js';
import { getColor }    from '~/palettes/palettes.js';

import { TILE_WIDTH } from '~/playfield/constants.js';


/**
 * A class that mimics the behavior of the video portion of the TIA in the Atari 2600.
 */
class TIAVideo
{
	/**
	 * @param {integer} width
	 * @param {integer} height
	 * @param {string}  palette
	 */
	constructor ( width, height, palette = 'NTSC' )
	{
		this.palette           = palette;
		this.renderBuffer      = new RenderBuffer (width, height);
		this.events            = new EventEmitter ();
		this.objects           = new TIAObjects ();
		this.collision         = new TIACollision ();
		this.drawPFOverPlayers = false;
		this.scanline          = 0;
		this.pixel             = 0;
	}

	/**
	 * @param {integer} colorIndex
	 * @private
	 */
	_renderPixel ( colorIndex )
	{
		const colorRGBA = getColor (this.palette, colorIndex);

		this.renderBuffer.drawPixel (this.pixel, this.scanline, colorRGBA);
	}

	/**
	 * @param {"tile"|"background"} tileOrBG
	 * @private
	 */
	_renderPlayfield ( tileOrBG )
	{
		const { playfield } = this.objects;

		const tileX = coordToTile (this.pixel, TILE_WIDTH);
		const tile  = playfield.getTile (tileX);

		if ( tile === -1 )
		{
			return;
		}

		if ( tile === 0  &&  tileOrBG === 'background' )
		{
			this._renderPixel (playfield.backgroundColor);
		}
		else if ( tile === 1  &&  tileOrBG === 'tile' )
		{
			this._renderPixel (playfield.tileColor);
			this.collision.addObjectToPixel ('playfield');
		}

	}

	/**
	 * @private
	 */
	_renderBall ()
	{
		const { playfield, ball } = this.objects;

		if ( !ball.isRenderCoord (this.pixel)  ||  !ball.enabled )
		{
			return;
		}

		this._renderPixel (playfield.tileColor);
		this.collision.addObjectToPixel ('ball');
	}

	/**
	 * @param {0|1} number
	 *
	 * @private
	 */
	_renderPlayer ( number )
	{
		const player = this.objects.getPlayer (number);

		if ( !(player instanceof Player) )
		{
			return;
		}

		if ( player.coordToPixel (this.pixel) === 1 )
		{
			this._renderPixel (player.color);
			this.collision.addObjectToPixel (`player${number}`);
		}
	}

	/**
	 * @param {0|1} number
	 *
	 * @private
	 */
	_renderMissile ( number )
	{
		const { objects } = this;

		const missile = objects.getMissile (number);
		const player  = objects.getPlayer (number);

		if ( !missile.isRenderCoord (this.pixel)  ||  !missile.enabled )
		{
			return;
		}

		this._renderPixel (player.color);
		this.collision.addObjectToPixel (`missile${number}`);
	}

	/**
	 * @returns {ImageData}
	 */
	render ()
	{
		const { renderBuffer, palette, events, objects, collision }     = this;
		const { playfield, player0, player1, ball, missile0, missile1 } = this;

		// Fallback color if nothing gets drawn.
		const baseColor = getColor (palette, 0);

		this.scanline = 0;

		events.emit ('renderStart');

		// Mimic how TIA draws pixels, scanline-by-scanline...
		for ( let scanline = 0;  scanline < renderBuffer.height;  scanline++ )
		{
			// Set the scanline property rather than directly modify it every time so it looks cleaner.
			this.scanline = scanline;

			events.emit ('scanline', scanline);

			this.pixel = 0;

			// ...pixel-by-pixel.
			for ( let pixel = 0;  pixel < renderBuffer.width;  pixel++ )
			{
				this.pixel = pixel;

				renderBuffer.drawPixel (pixel, scanline, baseColor);

				this._renderPlayfield ('background');

				/* Render playfield and ball if we're not drawing it over the player. */

				if ( !this.drawPFOverPlayers )
				{
					this._renderPlayfield ('tile');
					this._renderBall ();
				}

				/* Render player1. */

				this._renderPlayer (1);
				this._renderMissile (1);

				/* Render player0. */

				this._renderPlayer (0);
				this._renderMissile (0);

				/* Render playfield and ball if we are drawing it over the player. */

				if ( this.drawPFOverPlayers )
				{
					this._renderPlayfield ('tile');
					this._renderBall ();
				}

				/* Check collisions for all objects at this pixel, then reset pixel object data to
				   prepare for next pixel check. */

				collision.setPixelCollisions ();
				collision.clearPixelObjects ();
			}
		}

		events.emit ('renderEnd');

		return renderBuffer.imageData;
	}
}


export default TIAVideo;
