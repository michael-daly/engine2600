import RenderBuffer from '~/core/RenderBuffer.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';
import TIACollision from '~/core/TIACollision.js';
import Playfield    from '~/playfield/Playfield.js';
import Player       from '~/player/Player.js';
import MissileBall  from '~/missileBall/MissileBall.js';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';

import { getColor } from '~/palettes/palettes.js';


/**
 * A class that mimics the behavior of the video portion of the TIA in the Atari 2600.
 */
class TIAVideo
{
	/**
	 * @param {string} palette
	 */
	constructor ( palette = 'NTSC' )
	{
		this.palette           = palette;
		this.renderBuffer      = new RenderBuffer ();
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
	 * @private
	 */
	_renderPixel ( colorIndex )
	{
		this.renderBuffer.drawPixel (this.pixel, this.scanline, getColor (this.palette, colorIndex));
	}

	/**
	 * @param {Playfield} playfield
	 * @param {boolean}   [renderBG]
	 * @private
	 */
	_renderPlayfield ( playfield, renderBG = true )
	{
		const tile = playfield.getTileFromCoord (this.pixel);

		if ( tile === 0  &&  renderBG )
		{
			this._renderPixel (playfield.backgroundColor);
		}
		else if ( tile === 1 )
		{
			this._renderPixel (playfield.tileColor);
			this.collision.addObjectToPixel (playfield);
		}
	}

	/**
	 * @param {Player) player
	 * @private
	 */
	_renderPlayer ( player )
	{
		if ( player.coordToPixel (this.pixel) === 1 )
		{
			this._renderPixel (player.color);
			this.collision.addObjectToPixel (player);
		}
	}

	/**
	 * @param {MissileBall} missileOrBall
	 * @param {integer}     color
	 *
	 * @private
	 */
	_renderMissileBall ( missileOrBall, color )
	{
		if ( !missileOrBall.isRenderCoord (this.pixel)  ||  !missileOrBall.enabled )
		{
			return;
		}

		this._renderPixel (color);
		this.collision.addObjectToPixel (missileOrBall);
	}

	/**
	 * @returns {ImageData}
	 */
	render ( delta )
	{
		const { renderBuffer, events, collision } = this;

		// Objects we're going to render.
		const { playfield, player0, player1, ball, missile0, missile1 } = this;

		// Fallback color if nothing gets drawn.
		const baseColor = getColor (this.palette, 0);

		this.scanline = 0;

		events.emit ('renderStart', delta);

		// Mimic how TIA draws pixels, scanline-by-scanline...
		for ( let scanline = 0;  scanline < CANVAS_HEIGHT;  scanline++ )
		{
			// Set the scanline property rather than directly modify it every time so it looks cleaner.
			this.scanline = scanline;

			events.emit ('scanline', { scanline, delta });

			this.pixel = 0;

			const player0Color = player0.color;
			const player1Color = player1.color;

			const { tileColor } = playfield;

			// ...pixel-by-pixel.
			for ( let pixel = 0;  pixel < CANVAS_WIDTH;  pixel++ )
			{
				this.pixel = pixel;

				renderBuffer.drawPixel (pixel, scanline, baseColor);

				this._renderPlayfield (playfield);

				/* Render ball if we're not drawing it over the player. */

				if ( !this.drawPFOverPlayers )
				{
					this._renderMissileBall (ball, tileColor);
				}

				/* Render player1. */

				this._renderPlayer (player1);
				this._renderMissileBall (missile1, player1Color);

				/* Render player0. */

				this._renderPlayer (player0);
				this._renderMissileBall (missile0, player0Color);

				/* Render ball if we are drawing it over the player. */

				if ( this.drawPFOverPlayers )
				{
					this._renderPlayfield (playfield, false);
					this._renderMissileBall (ball, tileColor);
				}

				/* Check collisions for all objects at this pixel, then reset pixel object data to
				   prepare for next pixel check. */

				collision.setPixelCollisions ();
				collision.clearPixelObjects ();
			}
		}

		events.emit ('renderEnd', delta);

		return renderBuffer.imageData;
	}
}


export default TIAVideo;
