import Playfield    from '~/playfield/Playfield.js';
import Player       from '~/player/Player.js';
import Ball         from '~/missileBall/Ball.js';

import EventEmitter from '~/utility/classes/EventEmitter.js';
import createCanvas from '~/utility/createCanvas.js';

import { CANVAS_WIDTH, CANVAS_HEIGHT, TICK_RATE } from '~/core/constants.js';

import { DEFAULT_PF_X } from '~/playfield/constants.js';
import { coordToTile }  from '~/utility/snapCoord.js';
import { getColor }     from '~/palettes/palettes.js';


/**
 * Main app class.
 */
class Engine2600
{
	/**
	 * @param {string} elementID - The ID of the element we want to append our canvas to.
	 * @param {number} [scale]   - How much to scale up the fixed-resolution (320x226) canvas.
	 * @param {string} [palette] - The color palette to use.
	 */
	constructor ( elementID, scale = 3.0, palette = 'NTSC' )
	{
		const canvas = createCanvas (elementID, scale);

		this.canvas  = canvas;
		this.context = canvas.getContext ('2d');

		// For hooking into the update loop.
		this.events = new EventEmitter ();

		this.playfield = new Playfield ();
		this.ball      = new Ball ();
		this.player0   = new Player ();
		this.player1   = new Player ();
		this.missile0  = null;
		this.missile1  = null;

		// Name of the color palette we'll use for the playfield and all sprites.
		this.palette = palette;

		// Non-playfield background color.
		this.borderColor = 0;

		this.pfBGColors    = [];
		this.pfTileColors  = [];
		this.player0Colors = [];
		this.player1Colors = [];

		// Pre-bind the update method so we don't rebind it every single loop.
		this._updateBound = this.update.bind (this);

		// Initialize last update time.
		this._lastUpdateTime = performance.now ();

		// Pre-bind the render method so we don't rebind it every single loop.
		this._renderBound = this.render.bind (this);

		// Neither update() nor render() will run if this is false.
		this.isRunning = true;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;

		// Start our loops.
		this.update ();
		this.render ();
	}

	/**
	 * Deletes the canvas element, all properties, and sets isDeleted to true.
	 */
	delete ()
	{
		clearTimeout (this._updateTimeout);
		cancelAnimationFrame (this._frameRequest);

		this.canvas.remove ();
		this.events.clear ();

		if ( this.playfield !== null )
		{
			this.playfield.delete ();
		}

		delete this.parent;
		delete this.canvas;
		delete this.context;
		delete this.scale;
		delete this.events;
		delete this.playfield;
		delete this.ball;
		delete this.player0;
		delete this.player1;
		delete this.missile0;
		delete this.missile1;
		delete this._updateBound;
		delete this._updateTimeout;
		delete this._renderBound;
		delete this._frameRequest;
		delete this.isRunning;

		this.isDeleted = true;
	}

	/**
	 * Used in the render loop.
	 */
	clearCanvas ()
	{
		this.context.clearRect (0, 0, this.width, this.height);
	}

	/**
	 * Main update loop -- only runs if isRunning is set to true.
	 */
	update ()
	{
		if ( !this.isRunning )
		{
			return;
		}

		// Emit "update" event with the delta as the argument.
		this.events.emit ('update', performance.now () - this._lastUpdateTime);

		this._lastUpdateTime = performance.now ();
		this._updateTimeout  = setTimeout (this._updateBound, TICK_RATE);
	}

	/**
	 * Main render loop -- only runs if isRunning is set to true.
	 */
	render ()
	{
		if ( !this.isRunning )
		{
			return;
		}

		// Clear the canvas so we can draw the updated graphics.
		this.clearCanvas ();

		const
		{
			context,
			palette,
			playfield,
			ball,
			player0,
			player1,
			pfBGColors,
			pfTileColors,
			player0Colors,
			player1Colors,
		}
		= this;

		// Go scanline-by-scanline to emulate how the Atari 2600 draws graphics.
		for ( let scanline = 0;  scanline < CANVAS_HEIGHT;  scanline++ )
		{
			/* First, we render the playfield and the ball object. */

			const { tilemap } = playfield;

			if ( scanline >= playfield.y  &&  tilemap !== null )
			{
				/* Playfield only has one background/tile color at a time to emulate the 2600 again.
				   This has the effect of the ball being different colors when it's between tiles. */

				const tileY = coordToTile (scanline - playfield.y, tilemap.tileHeight);

				if ( tileY < pfBGColors.length )
				{
					playfield.backgroundColor = pfBGColors[tileY];
				}

				if ( tileY < pfTileColors.length )
				{
					playfield.tileColor = pfTileColors[tileY];
				}

				playfield.render (context, palette, scanline);
			}

			// Ball color is dependent on the playfield's tile color.
			ball.render (context, getColor (palette, playfield.tileColor), scanline);

			/* Render player0 and player1 */

			const players      = [player0, player1];
			const playerColors = [player0Colors, player1Colors];
			// TODO: missiles

			for ( let p = 0;  p < players.length;  p++ )
			{
				const player     = players[p];
				const colors     = playerColors[p];
				const playerRelY = scanline - player.y;

				if ( playerRelY < colors.length )
				{
					player.color = colors[playerRelY];
				}

				player.render (context, palette, scanline);
			}
		}

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		this._frameRequest = requestAnimationFrame (this._renderBound);
	}

	get width ()
	{
		return this.canvas.width;
	}

	get height ()
	{
		return this.canvas.height;
	}

	set scale ( scale )
	{
		this.canvas.style['transform'] = `scale(${scale})`;
	}

	set borderColor ( colorIndex )
	{
		this.canvas.style.background = `rgba(${getColor (this.palette, colorIndex)})`;
	}
}


export default Engine2600;
