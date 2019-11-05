import RenderBuffer from '~/core/RenderBuffer.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';
import TIACollision from '~/core/TIACollision.js';
import Playfield    from '~/playfield/Playfield.js';
import Player       from '~/player/Player.js';
import MissileBall  from '~/missileBall/MissileBall.js';

import { getColor } from '~/palettes/palettes.js';

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
		this.collision         = new TIACollision ();
		this.playfield         = new Playfield ();
		this.player0           = new Player ();
		this.player1           = new Player ();
		this.ball              = new MissileBall ();
		this.missile0          = new MissileBall ();
		this.missile1          = new MissileBall ();
		this.drawPFOverPlayers = false;
		this.scanline          = 0;
		this.pixel             = 0;
	}

	/**
	 * @param {integer} colorIndex
	 *
	 * @private
	 */
	_renderPixel ( colorIndex )
	{
		this.renderBuffer.drawPixel (this.pixel, this.scanline, getColor (this.palette, colorIndex));
	}

	/**
	 * @param {boolean} [renderTile]
	 * @param {boolean} [renderBG]
	 * @private
	 */
	_renderPlayfield ( renderTile = true, renderBG = true )
	{
		const { playfield, pixel, scanline } = this;

		const tile = playfield.getTileFromCoord (pixel);

		if ( tile === 0  &&  renderBG )
		{
			this._renderPixel (playfield.backgroundColor);
		}
		else if ( tile === 1  &&  renderTile )
		{
			this._renderPixel (playfield.tileColor);
		}
	}

	/**
	 * @private
	 */
	_renderBall ()
	{
		const { ball } = this;

		if ( !ball.isRenderCoord (this.pixel)  ||  !ball.enabled )
		{
			return;
		}

		this._renderPixel (this.playfield.tileColor);
		this.collision.addObjectToPixel ('ball');
	}

	/**
	 * @param {0|1} number
	 * @private
	 */
	_renderPlayer ( number )
	{
		const field  = `player${number}`;
		const player = this[field];

		if ( player.coordToPixel (this.pixel) === 1 )
		{
			this._renderPixel (player.color);
			this.collision.addObjectToPixel (field);
		}
	}

	/**
	 * @param {0|1} number
	 * @private
	 */
	_renderMissile ( number )
	{
		const field   = `missile${number}`;
		const missile = this[field]; 
		const player  = this[`player${number}`];

		if ( !missile.isRenderCoord (this.pixel)  ||  !missile.enabled )
		{
			return;
		}

		this._renderPixel (player.color);
		this.collision.addObjectToPixel (field);
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

				this._renderPlayfield ();

				/* Render ball if we're not drawing it over the player. */

				if ( !this.drawPFOverPlayers )
				{
					this._renderBall ();
				}

				/* Render player1. */

				this._renderPlayer (1);
				this._renderMissile (1);

				/* Render player0. */

				this._renderPlayer (0);
				this._renderMissile (0);

				/* Render ball if we are drawing it over the player. */

				if ( this.drawPFOverPlayers )
				{
					this._renderPlayfield (true, false);
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
