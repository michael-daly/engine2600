import RenderBuffer from '~/core/RenderBuffer.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';

import { createCanvas } from '~/utility/createCanvas.js';
import { TICK_RATE }    from '~/core/constants.js';


/**
 * Main app class.
 */
class Engine2600
{
	/**
	 * @param {HTMLCanvasElement} canvas
	 * @param {TIAVideo}          tiaVideo
	 * @param {TIAAudio}          tiaAudio
	 */
	constructor ( canvas, tiaVideo, tiaAudio )
	{
		// For hooking into the update loop.
		this.events = new EventEmitter ();

		this.canvas       = canvas;
		this.context      = canvas.getContext ('2d');
		this.tiaVideo     = tiaVideo;
		this.tiaAudio     = tiaAudio;
		this.renderBuffer = new RenderBuffer (canvas.width, canvas.height);

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

		delete this.renderBuffer;
		delete this.video;
		delete this.events;
		delete this._updateBound;
		delete this._updateTimeout;
		delete this._renderBound;
		delete this._frameRequest;
		delete this.isRunning;

		this.isDeleted = true;
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

		const { events, context, renderBuffer, tiaVideo } = this;

		events.emit ('renderStart');

		context.putImageData (tiaVideo.render (renderBuffer), 0, 0);

		events.emit ('renderEnd');

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		this._frameRequest = requestAnimationFrame (this._renderBound);
	}
}


export default Engine2600;
