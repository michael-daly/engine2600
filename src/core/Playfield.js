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
	 * @param {string}  palette    - The color palette we want to use.  Available: NTSC, PAL, and SECAM.
	 * @param {integer} tileHeight - The height of a playfield tile -- must be a divisor of 192.
	 */
	constructor ( palette = 'NTSC', tileHeight = 16 )
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
			return { bgColor: 0, tileColor: 1, rowTiles: createArray (width, () => 0) };
		});

		// Static property -- don't change it or you'll break everything.
		this.tileHeight = tileHeight;

		// Color palette -- don't change this.
		this.palette = palette;

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
	 * Call callback on each row.
	 *
	 * @param {Function} callback - (rowIndex, row)
	 */
	forEachRow ( callback )
	{
		const { height, tiles } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			callback (y, tiles[y]);
		}
	}

	/**
	 * Call callback on each tile.
	 *
	 * @param {Function} callback - (x, y, tile, rowTiles)
	 */
	forEachTile ( callback )
	{
		const { height, width, tiles } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			const { rowTiles } = tiles[y];

			for ( let x = 0;  x < width;  x++ )
			{
				callback (x, y, rowTiles[x], rowTiles);
			}
		}
	}

	/**
	 * Reset all tiles to 0.
	 */
	clearTiles ()
	{
		this.forEachTile (( x, y, tile, rowTiles ) =>
		{
			rowTiles[x] = 0;
		});

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
	 * Set the background color index for all rows.
	 *
	 * @param {integer} colorIndex
	 */
	setBackgroundColor ( colorIndex )
	{
		this.forEachRow (rowIndex =>
		{
			this.setRowBGColor (rowIndex, colorIndex);
		});
	}

	/**
	 * Set the tile color index for all rows.
	 *
	 * @param {integer} colorIndex
	 */
	setTileColor ( colorIndex )
	{
		this.forEachRow (rowIndex =>
		{
			this.setRowTileColor (rowIndex, colorIndex);
		});
	}

	/**
	 * Set a row's background color index.
	 *
	 * @param {integer} rowIndex
	 * @param {integer} colorIndex
	 */
	setRowBGColor ( rowIndex, colorIndex )
	{
		this.tiles[rowIndex].bgColor = colorIndex;
		this.updateRow (rowIndex);
	}

	/**
	 * Set a row's tile color index.
	 *
	 * @param {integer} rowIndex
	 * @param {integer} colorIndex
	 */
	setRowTileColor ( rowIndex, colorIndex )
	{
		this.tiles[rowIndex].tileColor = colorIndex;
		this.updateRow (rowIndex);
	}

	/**
	 * Update the image data for all tiles.
	 */
	updateAllTiles ()
	{
		this.forEachRow (rowIndex =>
		{
			this.updateRow (rowIndex);
		});
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
		const { tileHeight, imageData, palette } = this;

		const tileColor  = getColor (palette, this.getTileColor (y));
		const bgColor    = getColor (palette, this.getBackgroundColor (y));
		const pixelColor = this.getTile (x, y) ? tileColor : bgColor;

		const startX = x      * TILE_WIDTH;
		const startY = y      * tileHeight;
		const endX   = startX + TILE_WIDTH;
		const endY   = startY + tileHeight;

		for ( let tileY = startY;  tileY < endY;  tileY++ )
		{
			for ( let tileX = startX;  tileX < endX;  tileX++ )
			{
				setPixel (imageData, tileX, tileY, pixelColor);
			}
		}
	}
}


export default Playfield;
