import Playfield from '~/core/Playfield.js';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';


/**
 * Main app class.
 */
class MakerApp
{
	/**
	 * @param {string} elementID - The ID of the element we want to append our canvas to.
	 * @param {number} scale     - How much to scale up the fixed-resolution (320x226) canvas.
	 * @param {string} palette   - The color palette to use.
	 */
	constructor ( elementID, scale = 2.0, palette = 'NTSC' )
	{
		/* Create the canvas we will render everything on. */

		const canvas  = document.createElement ('canvas');
		canvas.width  = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;

		/* Scale the canvas up, making sure it's not blurry. */

		canvas.style['image-rendering']  = 'crisp-edges';
		canvas.style['transform-origin'] = 'left top';
		canvas.style['transform']        = `scale(${scale})`;

		/* Finally, append the canvas to our parent element. */

		this.parent = document.getElementById (elementID);
		this.parent.appendChild (canvas);

		this.canvas  = canvas;
		this.context = canvas.getContext ('2d');
		this.scale   = scale;

		this.palette = palette;

		/* These are set later. */

		this.playfield = null;
		this.player1   = null;
		this.player2   = null;

		// MakerApp has been disposed of -- don't try to use it if this is true.
		this.isDeleted = false;

		// Pre-bind the render function so we don't rebind it every single loop.
		this.renderBound = this.render.bind (this);

		// The render loop will only run if this is set to true.
		this.isRendering = true;

		// Start the render loop.
		this.render ();
	}

	/**
	 * Deletes the canvas element, all properties, and sets isDeleted to true.
	 */
	delete ()
	{
		this.canvas.remove ();

		delete this.parent;
		delete this.canvas;
		delete this.context;
		delete this.playfield;
		delete this.renderBound;
		delete this.isRendering;

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
	 * Main render loop -- only runs if isRendering is set to true.
	 */
	render ()
	{
		if ( !this.isRendering )
		{
			return;
		}

		// Clear the canvas so we can draw the updated graphics.
		this.clearCanvas ();

		const { playfield } = this;

		if ( playfield !== null )
		{
			// Draw the playfield, if it exists.
			playfield.render (this.context);
		}

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		requestAnimationFrame (this.renderBound);
	}

	/**
	 * Adds a playfield, if there is none yet.
	 *
	 * @param {integer} tileHeight - The tile height, provided it's a divisor of 192.
	 *
	 * @returns {Playfield} If there's an existing playfield, it will just return that, otherwise
	 *                      it will return a new one.
	 */
	addPlayfield ( tileHeight )
	{
		if ( this.playfield !== null )
		{
			return this.playfield;
		}

		return this.playfield = new Playfield (this.palette, tileHeight);
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
}


export default MakerApp;
