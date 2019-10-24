import MissileBall from '~/missileBall/MissileBall.js';

/**
 * Stub class in case we want to overwrite some methods from MissileBall.
 */
class Missile extends MissileBall
{
	constructor ( width, height )
	{
		super (width, height);

		/* 0 - 1 copy of missile.
		   1 - 2 close-spaced copies of missile.
		   2 - 2 medium-spaced copies of missile.
		   3 - 3 close-spaced copies of missile.
		   4 - 2 wide-spaced copies of missile.
		   5 - N/A.
		   6 - 3 medium-spaced copies of missile.
		   7 - N/A. */
		this.modifier = 0;
	}

	/**
	 * Draws this on a canvas context.
	 *
	 * @param {CanvasRenderingContext2D} context   - The canvas context to draw this on.
	 * @param {integer[]}                colorRGBA - The RGBA color to draw this as.
	 * @param {integer}                  scanline  - The scanline we're currently rendering.
	 */
	render ( context, colorRGBA, scanline )
	{
		if ( !this.isLineRendered (scanline) )
		{
			return;
		}

		// TODO: Handle this.modifier exceptions

		drawFillRect (context, colorRGBA, this.x, scanline, this.drawWidth, this.drawHeight);
	}
}


export default Missile;
