import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';


class MakerApp
{
	constructor ( elementID, scale = 2.0, playfield = null )
	{
		const parentElement = document.getElementById (elementID);
		const canvas        = document.createElement ('canvas');
		const context       = canvas.getContext ('2d');

		canvas.width  = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;

		canvas.style['image-rendering']  = 'crisp-edges';
		canvas.style['transform-origin'] = 'left top';
		canvas.style['transform']        = `scale(${scale})`;

		parentElement.appendChild (canvas);

		this.parentElement = parentElement;
		this.canvas        = canvas;
		this.context       = context;
		this.playfield     = playfield;
		this.renderBound   = this.render.bind (this);
		this.isRendering   = true;
		this.isDeleted     = false;

		this.render ();
	}

	delete ()
	{
		this.canvas.remove ();

		delete this.parentElement;
		delete this.canvas;
		delete this.context;
		delete this.playfield;
		delete this.renderBound;
		delete this.isRendering;

		this.isDeleted = true;
	}

	clearCanvas ()
	{
		this.context.clearRect (0, 0, this.width, this.height);
	}

	render ()
	{
		if ( !this.isRendering )
		{
			return;
		}

		this.clearCanvas ();

		const { playfield } = this;

		if ( playfield !== null )
		{
			this.context.putImageData (playfield.imageData, 0, 0);
		}

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
