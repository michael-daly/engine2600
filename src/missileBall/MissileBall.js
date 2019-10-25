import
{
	VALID_WIDTHS,

	DEFAULT_MB_WIDTH,
	DEFAULT_MB_HEIGHT,
	DEFAULT_MB_X,
	DEFAULT_MB_Y,

	MB_MUL_WIDTH,
	MB_MUL_HEIGHT,
	MB_ADD_HEIGHT,
}
from '~/missileBall/constants.js';

import { PIXEL_WIDTH, PIXEL_HEIGHT } from '~/core/constants.js';

import { getColor } from '~/palettes/palettes.js';


/**
 * Abstract class for sharing methods between Missile and Ball, since they essentially have the same
 * behavior.
 */
class MissileBall
{
	/**
	 * @param {integer} width  - 1, 2, 4, or 8.
	 * @param {integer} height - Heights are arbitrary.
	 */
	constructor ( width = DEFAULT_MB_WIDTH, height = DEFAULT_MB_HEIGHT )
	{
		if ( VALID_WIDTHS.indexOf (width) < 0 )
		{
			throw new Error ('Invalid width!');
		}

		this.x       = DEFAULT_MB_X;
		this.y       = DEFAULT_MB_Y;
		this._width  = width;
		this._height = height;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;
	}

	/**
	 * Delete all properties and set isDeleted to true.
	 */
	delete ()
	{
		delete this.x;
		delete this.y;
		delete this._width;
		delete this._height;

		this.isDeleted = true;
	}

	isLineRendered ( scanline )
	{
		const { width, height, y } = this;
		const maxY = y + (height * MB_MUL_HEIGHT) + MB_ADD_HEIGHT;

		return scanline >= y  &&  scanline < maxY  &&  width > 0  &&  height > 0;
	}

	/**
	 * Draws this on a buffer.
	 *
	 * @param {RenderBuffer} renderBuffer - The buffer to draw this on.
	 * @param {integer[]}    colorRGBA    - The RGBA color to draw this as.
	 * @param {integer}      scanline     - The scanline we're currently rendering.
	 */
	render ( renderBuffer, colorRGBA, scanline )
	{
		if ( !this.isLineRendered (scanline) )
		{
			return;
		}

		renderBuffer.drawHorizontalLine (colorRGBA, this.x, scanline, this.drawWidth);
	}

	set width ( width )
	{
		if ( VALID_WIDTHS.indexOf (width) < 0 )
		{
			return;
		}

		this._width = width;
	}

	set height ( height )
	{
		if ( height < 0 )
		{
			return;
		}

		this._height = height;
	}

	get width ()
	{
		return this._width;
	}

	get height ()
	{
		return this._height;
	}

	get drawWidth ()
	{
		return this.width * MB_MUL_WIDTH;
	}

	get drawHeight ()
	{
		return 1;
	}
}


export default MissileBall;
