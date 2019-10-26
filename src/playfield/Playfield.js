import { getColor }     from '~/palettes/palettes.js';
import { coordToTile }  from '~/utility/snapCoord.js';
import { createArray }  from '~/utility/createArray.js';

import
{
	TILE_WIDTH,

	DEFAULT_PF_X,
	DEFAULT_PF_Y,
}
from '~/playfield/constants.js';


/**
 * Used for storing/updating playfield data for the game.
 */
class Playfield
{
	/**
	 * @param {Tilemap} [tilemap]
	 */
	constructor ( tilemap = null )
	{
		this.tilemap         = tilemap;
		this.backgroundColor = 0;
		this.tileColor       = 1;
		this.y               = DEFAULT_PF_Y;

		// If this is true, this instance has been disposed of, so don't try to use it.
		this.isDeleted = false;
	}

	/**
	 * Deletes all properties and sets isDeleted to true.
	 */
	delete ()
	{
		delete this.tilemap;
		delete this.backgroundColor;
		delete this.tileColor;
		delete this.y;

		this.isDeleted = true;
	}

	/**
	 * Draws the playfield on a buffer.
	 *
	 * @param {RenderBuffer} renderBuffer - The buffer to draw this on.
	 * @param {string}       palette      - The color palette to draw this with.
	 * @param {integer}      scanline     - The scanline we're currently rendering.
	 */
	render ( renderBuffer, palette, scanline )
	{
		const { tilemap, backgroundColor, tileColor, y } = this;

		if ( tilemap === null )
		{
			return;
		}

		const { height, tileHeight } = tilemap;

		const relativeY = scanline - y;

		if ( scanline < y  ||  scanline >= relativeY + (height * tileHeight) )
		{
			return;
		}

		const tileY    = coordToTile (relativeY, tileHeight);
		const bgRGBA   = getColor (palette, backgroundColor);
		const tileRGBA = getColor (palette, tileColor);

		tilemap.forEach (tileY, ( tileX, tile ) =>
		{
			const colorRGBA = (tile ? tileRGBA : bgRGBA);

			renderBuffer.drawHorizontalLine (colorRGBA, tileX * TILE_WIDTH, scanline, TILE_WIDTH);
		});
	}

	/**
	 * Returns tilemap width in tiles.
	 */
	get width ()
	{
		const { tilemap } = this;

		return (tilemap === null) ? 0 : tilemap.width;
	}

	/**
	 * Returns tilemap height in tiles.
	 */
	get height ()
	{
		const { tilemap } = this;

		return (tilemap === null) ? 0 : tilemap.height;
	}

	/**
	 * Returns tilemap width in pixels.
	 */
	get pixelWidth ()
	{
		const { tilemap } = this;

		return (tilemap === null) ? 0 : (tilemap.width * tilemap.tileWidth);
	}

	/**
	 * Returns tilemap height in pixels.
	 */
	get pixelHeight ()
	{
		const { tilemap } = this;

		return (tilemap === null) ? 0 : (tilemap.height * tilemap.tileHeight);
	}
}


export default Playfield;
