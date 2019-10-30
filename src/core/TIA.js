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

		const { events, context, video } = this;

		context.putImageData (video.render (), 0, 0);

		// Use the pre-bound render method so we don't lose the `this` binding, and so we don't rebind
		// the method every single loop.
		this._frameRequest = requestAnimationFrame (this._renderBound);
	}
}


export default TIA;
