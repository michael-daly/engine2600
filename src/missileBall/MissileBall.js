import
{
	VALID_WIDTHS,

	DEF_MB_WIDTH,
	DEF_MB_X,

	MB_MUL_WIDTH,
}
from '~/missileBall/constants.js';


class MissileBall
{
	/**
	 * @param {integer} [x]
	 * @param {integer} [width]
	 */
	constructor ( x = DEF_MB_X, width = DEF_MB_WIDTH )
	{
		this._x      = x;
		this._width  = width;
		this.enabled = false;
	}

	/**
	 * Checks if this is an X coordinate is within the missile's/ball's render area.
	 */
	isRenderCoord ( coordX )
	{
		return coordX >= this.x  &&  coordX < this.x + this.width;
	}

	get x ()
	{
		return this._x;
	}

	get width ()
	{
		return this._width;
	}

	get drawWidth ()
	{
		return this.width * MB_MUL_WIDTH;
	}

	set x ( x )
	{
		this._x = Math.round (x);
	}

	set width ( width )
	{
		if ( VALID_WIDTHS.indexOf (width) < 0 )
		{
			return;
		}

		this._width = width;
	}
}


export default MissileBall;
