import RenderBuffer from '~/core/RenderBuffer.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';
import TIACollision from '~/TIA/TIACollision.js';
import Playfield    from '~/playfield/Playfield.js';
import Player       from '~/player/Player.js';
import MissileBall  from '~/missileBall/MissileBall.js';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';

import { getColor } from '~/palettes/palettes.js';


/**
 * A class that mimics the behavior of the video portion of the TIA.
 */
class TIAVideo
{
	/**
	 * @param {"NTSC"|"PAL"|"SECAM"} [palette]
	 */
	constructor ( palette = 'NTSC' )
	{
		// Color palette to render graphics with.
		this.palette = palette;

		// Used to draw graphics that will be put on a canvas.
		this.renderBuffer = new RenderBuffer ();

		/**
		 * Events for hooking into the rendering process.
		 *
		 * Three events are available:
		 *     "renderStart" - Called at the beginning, before any rendering occurs.
		 *     "scanline"    - Called before rendering each scanline.
		 *     "renderEnd"   - Called after the rendering process is over.
		 */
		this.events = new EventEmitter ();

		/**
		 * Used for checking collisions between objects (players, playfield, missiles, and ball).
		 *
		 * To check collision between two objects, use `checkCollision(object1, object2)`
		 *
		 * Like the actual Atari 2600, collisions have to be reset manually with `clearCollisions()`
		 */
		this.collision = new TIACollision ();

		/**
		 * Game Objects
		 *
		 * The Atari 2600 has a total of five objects, plus a playfield:
		 *    - Player0
		 *    - Player1
		 *    - Missile0
		 *    - Missile1
		 *    - Ball
		 *
		 * These can be repositioned per-scanline for more detail, which was *heavily* abused by pretty
		 * much every game made for the system, as it was extremely limited in its capabilities.
		 */

		/* @see Playfield */

		this.playfield = new Playfield ();

		/* @see Player */

		this.player0 = new Player ();
		this.player1 = new Player ();

		/* @see MissileBall */

		this.ball     = new MissileBall ();
		this.missile0 = new MissileBall ();
		this.missile1 = new MissileBall ();

		// If true, playfield tiles and the ball will be drawn over players and missiles.
		this.drawPFOverPlayers = false;

		// The current scanline and pixel we're drawing.  Mostly for internal use.
		this.scanline = 0;
		this.pixel    = 0;
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
	 *
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
	 * @param {Player} player
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

		// Mimic how the actual TIA runs, scanline-by-scanline...
		for ( let scanline = 0;  scanline < CANVAS_HEIGHT;  scanline++ )
		{
			// Set the scanline property rather than directly modify it every time.
			this.scanline = scanline;

			events.emit ('scanline', { scanline, delta });

			const player0Color = player0.color;
			const player1Color = player1.color;

			const { tileColor } = playfield;

			this.pixel = 0;

			// ...pixel-by-pixel.
			for ( let pixel = 0;  pixel < CANVAS_WIDTH;  pixel++ )
			{
				this.pixel = pixel;

				// Draw fallback color.
				renderBuffer.drawPixel (pixel, scanline, baseColor);

				// Initial playfield render.
				this._renderPlayfield (playfield);

				/* Render ball if we're not drawing it over the player. */

				if ( !this.drawPFOverPlayers )
				{
					this._renderMissileBall (ball, tileColor);
				}

				/* Render player1/missile1. */

				this._renderPlayer (player1);
				this._renderMissileBall (missile1, player1Color);

				/* Render player0/missile0. */

				this._renderPlayer (player0);
				this._renderMissileBall (missile0, player0Color);

				/* Render playfield tile and ball if we are drawing them over the player. */

				if ( this.drawPFOverPlayers )
				{
					this._renderPlayfield (playfield, false);
					this._renderMissileBall (ball, tileColor);
				}

				/* Check collisions for all objects at this pixel, then reset pixel object data to
				   prepare for the next pixel check. */

				collision.setPixelCollisions ();
				collision.clearPixelObjects ();
			}
		}

		events.emit ('renderEnd', delta);

		return renderBuffer.imageData;
	}
}


export default TIAVideo;
