import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';


/**
 * Main app class.
 */
class MakerApp
{
	/**
	 * @param {string}         elementID - The ID of the element we want to append our canvas to.
	 * @param {number}         scale     - How much to scale up the fixed-resolution (320x226) canvas.
	 * @param {Playfield|null} playfield - The Playfield instance we want to use for the game.
	 */
	constructor ( elementID, scale = 2.0, playfield = null )
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

		// This can be set later, and playfields can easily be swapped out for one another.
		this.playfield = playfield;

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
			this.context.putImageData (playfield.imageData, 0, 0);
		}

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		requestAnimationFrame (this.renderBound);
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
