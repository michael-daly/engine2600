import Playfield    from '~/playfield/Playfield.js';
import Player       from '~/player/Player.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';
import createCanvas from '~/utility/createCanvas.js';

import { TICK_RATE }    from '~/core/constants.js';
import { DEFAULT_PF_X } from '~/playfield/constants.js';
import { getColor }     from '~/palettes/palettes.js';


/**
 * Main app class.
 */
class MakerApp
{
	/**
	 * @param {string} elementID - The ID of the element we want to append our canvas to.
	 * @param {number} [scale]   - How much to scale up the fixed-resolution (320x226) canvas.
	 * @param {string} [palette] - The color palette to use.
	 */
	constructor ( elementID, scale = 2.0, palette = 'NTSC' )
	{
		const canvas = createCanvas (elementID, scale);

		this.canvas  = canvas;
		this.context = canvas.getContext ('2d');

		// For hooking into the update loop.
		this.events = new EventEmitter ();

		// Use addPlayfield() to create one.
		this.playfield = null;

		// The Atari 2600 technically only had support for two sprites.
		this.player1 = null;
		this.player2 = null;

		// Name of the color palette we'll use for the playfield and all sprites.
		this.palette = palette;

		// Non-playfield background color.
		this.borderColor = 0;

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
		delete this.player1;
		delete this.player2;
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

		const { playfield, player1, player2 } = this;

		if ( playfield !== null )
		{
			// Draw the playfield, if it exists.
			playfield.render (this.context);
		}

		if ( player1 !== null )
		{
			player1.render (this.context);
		}

		if ( player2 !== null )
		{
			player2.render (this.context);
		}

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		this._frameRequest = requestAnimationFrame (this._renderBound);
	}

	/**
	 * Adds a playfield, deleting the existing one if there is one.
	 *
	 * @param {integer} tileHeight - The tile height, provided it's a divisor of 192.
	 *
	 * @returns {Playfield}
	 */
	addPlayfield ( tileHeight )
	{
		if ( this.playfield !== null )
		{
			this.playfield.delete ();
		}

		return this.playfield = new Playfield (tileHeight, this.palette);
	}

	/**
	 * Adds a player, deleting the existing one if there is one.
	 *
	 * @param {Sprite} sprite - The sprite to add to the player.
	 * @param {1|2}    type   - Whether to add player1 or player2.
	 *
	 * @returns {Player|null} - Newly-created player instance, null if invalid type.
	 */
	addPlayer ( sprite, type = 1 )
	{
		let field;

		if ( type === 1  ||  type === 2 )
		{
			field = `player${type}`;
		}
		else
		{
			return null;
		}

		if ( this[field] !== null )
		{
			this[field].delete ();
		}

		return this[field] = new Player (sprite, this.palette);
	}

	/**
	 * Deletes the playfield and sets the property to null.
	 */
	deletePlayfield ()
	{
		if ( this.playfield === null )
		{
			return;
		}

		this.playfield.delete ();
		this.playfield = null;
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


export default MakerApp;
