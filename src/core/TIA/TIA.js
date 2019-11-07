import EventEmitter from '~/utility/classes/EventEmitter.js';


/**
 * Television Interface Adaptor -- Main app class.
 */
class TIA
{
	/**
	 * @param {HTMLCanvasElement} canvas
	 * @param {TIAVideo}          video
	 * @param {TIAudio}           audio
	 */
	constructor ( canvas, video, audio )
	{
		this.canvas  = canvas;
		this.context = canvas.getContext ('2d');
		this.video   = video;
		this.audio   = audio;
		this.events  = new EventEmitter ();

		this.lastRenderTime   = performance.now ();
		this.renderTimeDelta  = 0;
		this.deltaSum         = 0;
		this.frameCount       = 0;

		// Pre-bind the render method so we don't rebind it every single loop.
		this._renderBound = this.render.bind (this);

		// render() won't run if this is false.
		this.isRunning = true;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;

		// Start our loop.
		this.render ();
	}

	/**
	 * Deletes the canvas element, all properties, and sets isDeleted to true.
	 */
	delete ()
	{
		cancelAnimationFrame (this._frameRequest);

		this.canvas.remove ();
		this.events.clear ();

		delete this.events;
		delete this.canvas;
		delete this.context;
		delete this.video;
		delete this.audio;
		delete this.lastRenderTime;
		delete this.renderTimeDelta;
		delete this.deltaSum;
		delete this.frameCount;
		delete this._renderBound;
		delete this._frameRequest;
		delete this.isRunning;

		this.isDeleted = true;
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

		/* Render TIAVideo and draw returned ImageData on the canvas. */

		const renderImage = this.video.render (this.renderTimeDelta);

		this.context.putImageData (renderImage, 0, 0);

		/* Deltas, frame counters, FPS, and performance. */

		const now = performance.now ();

		this.renderTimeDelta = now - this.lastRenderTime;
		this.lastRenderTime  = now;

		this.deltaSum += this.renderTimeDelta;
		this.frameCount++;

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		this._frameRequest = requestAnimationFrame (this._renderBound);
	}
}


export default TIA;
