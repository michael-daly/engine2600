import { getColor }    from '~/core/palettes/palettes.js';
import { setPixel }    from '~/utility/imageData.js';
import { createArray } from '~/utility/createArray.js';

import
{
	TILE_WIDTH,

	PF_WIDTH_TILES,
	PF_WIDTH_PIXELS,
	PF_HEIGHT_PIXELS,

	MAX_COLORS,
}
from '~/core/constants.js';


/**
 * Used for storing/updating playfield data for the game.
 */
class Playfield
{
	/**
	 * @param {integer} tileHeight - The height of a playfield tile -- must be a divisor of 192.
	 * @param {integer} bgColor    - Default row background color index.
	 * @param {integer} tileColor  - Default row tile color index.
	 */
	constructor ( tileHeight = 16, bgColor = 0, tileColor = 7 )
	{
		if ( PF_HEIGHT_PIXELS % tileHeight !== 0 )
		{
			throw new Error (`\`tileHeight\` must be a divisor of ${PF_HEIGHT_PIXELS}`);
		}

		const width  = PF_WIDTH_TILES;
		const height = PF_HEIGHT_PIXELS / tileHeight;

		// Initialize tile array with the all tiles set to 0, and all the colors set to their defaults.
		this.tiles = createArray (height, () =>
		{
			return { bgColor, tileColor, rowTiles: createArray (width, () => 0) };
		});

		// Static property -- don't change it or you'll break everything.
		this.tileHeight = tileHeight;

		// Playfield width and height in tiles.
		this.width  = width;
		this.height = height;

		// Playfield has been disposed of -- don't try to use it if this is true.
		this.isDeleted = false;

		// Used for drawing the playfield on a canvas.
		this.imageData = new ImageData (PF_WIDTH_PIXELS, PF_HEIGHT_PIXELS);

		// Initialize tile image data.
		this.updateAllTiles ();
	}

	/**
	 * Deletes all properties and sets isDeleted to true.
	 */
	delete ()
	{
		delete this.tiles;
		delete this.tileHeight;
		delete this.height;
		delete this.imageData;

		this.isDeleted = true;
	}

	/**
	 * Reset all tiles to 0.
	 */
	clearTiles ()
	{
		const { height, width } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			const { rowTiles } = this.tiles[y];

			for ( let x = 0;  x < width;  x++ )
			{
				rowTiles[x] = 0;
			}
		}

		this.updateAllTiles ();
	}

	/**
	 * Get the tile bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 *
	 * @returns {0|1}
	 */
	getTile ( x, y )
	{
		return this.tiles[y].rowTiles[x];
	}

	/**
	 * Get row background color index.
	 *
	 * @param   {integer} rowIndex
	 * @returns {integer}
	 */
	getBackgroundColor ( rowIndex )
	{
		return this.tiles[rowIndex].bgColor;
	}

	/**
	 * Get row tile color index.
	 *
	 * @param   {integer} rowIndex
	 * @returns {integer}
	 */
	getTileColor ( rowIndex )
	{
		return this.tiles[rowIndex].tileColor;
	}

	/**
	 * Set the tile bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 * @param {0|1}     bool - 0 for no tile, 1 for tile.
	 */
	setTile ( x, y, bool )
	{
		if ( x < 0  ||  x >= this.width )
		{
			return;
		}

		if ( y < 0  ||  y >= this.height )
		{
			return;
		}

		this.tiles[y].rowTiles[x] = +(!!bool);

		this.updateTile (x, y);
	}

	/**
	 * @param {integer} rowIndex
	 * @param {integer} colorIndex
	 */
	setBackgroundColor ( rowIndex, colorIndex )
	{
		this.tiles[rowIndex].bgColor = colorIndex;
		this.updateRow (rowIndex);
	}

	/**
	 * @param {integer} rowIndex
	 * @param {integer} colorIndex
	 */
	setTileColor ( rowIndex, colorIndex )
	{
		this.tiles[rowIndex].tileColor = colorIndex;
		this.updateRow (rowIndex);
	}

	/**
	 * Update the image data for all tiles.
	 */
	updateAllTiles ()
	{
		const { height } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			this.updateRow (y);
		}
	}

	/**
	 * Update the image data for all tiles in a row.
	 *
	 * @param {integer} rowIndex
	 */
	updateRow ( rowIndex )
	{
		const { width } = this;

		for ( let x = 0;  x < width;  x++ )
		{
			this.updateTile (x, rowIndex);
		}
	}

	/**
	 * Update the image data for a tile at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 */
	updateTile ( x, y )
	{
		const tileColor = getColor (this.getTileColor (y));
		const bgColor   = getColor (this.getBackgroundColor (y));
		const color     = this.getTile (x, y) ? tileColor : bgColor;

		const { tileHeight, imageData } = this;

		const startX = x      * TILE_WIDTH;
		const startY = y      * tileHeight;
		const endX   = startX + TILE_WIDTH;
		const endY   = startY + tileHeight;

		for ( let tileY = startY;  tileY < endY;  tileY++ )
		{
			for ( let tileX = startX;  tileX < endX;  tileX++ )
			{
				setPixel (imageData, tileX, tileY, color);
			}
		}
	}
}


export default Playfield;
