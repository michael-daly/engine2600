import { setPixel } from '~/utility/imageData.js';


class RenderBuffer
{
	constructor ( canvas )
	{
		const { width, height } = canvas;

		const context = canvas.getContext ('2d');

		this.imageData = context.createImageData (width, height);
		this.pixels    = [];
		this.changed   = [];
		this.width     = width;
		this.height    = height;
	}

	drawPixel ( x, y, colorArray )
	{
		if ( x < 0  ||  y < 0  ||  x >= this.width  ||  y >= this.height )
		{
			return;
		}

		setPixel (this.imageData, x, y, colorArray);
	}

	drawHorizontalLine ( colorArray, x, y, width )
	{
		for ( let drawX = x;  drawX < x + width;  drawX++ )
		{
			this.drawPixel (drawX, y, colorArray);
		}
	}
}


export default RenderBuffer;
