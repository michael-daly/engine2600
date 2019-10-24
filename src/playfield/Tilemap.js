import { TILE_WIDTH, PF_WIDTH_TILES, PF_HEIGHT_PIXELS } from '~/playfield/constants.js';


/**
 * A class for rendering playfields.
 */
class Tilemap
{
	/**
	 * @param {Array[]} tileData     - [ [ ... ], ... ]
	 * @param {integer} [tileHeight] - The height each tile will be -- must be a divisor of 192.
	 *
	 * @throws Will throw an error if the tile data is invalid (too wide, too short, etc.) or if
	 *         tileHeight is not a divisor of 192.
	 */
	constructor ( tileData, tileHeight = 16 )
	{
		const height = tileData.length;
		const width  = tileData[0].length;

		if ( width < 1 )
		{
			throw new Error (`Tilemap must be at least 1 tile wide`);
		}

		if ( width > PF_WIDTH_TILES )
		{
			throw new Error (`Tilemap cannot be wider than ${PF_WIDTH_TILES} tile(s)`);
		}

		if ( height < 1 )
		{
			throw new Error (`Tilemap must be at least 1 tile high`);
		}

		if ( PF_HEIGHT_PIXELS % tileHeight !== 0 )
		{
			throw new Error (`\`tileHeight\` must be a divisor of ${PF_HEIGHT_PIXELS}`);
		}
	
		this.tiles      = tileData;
		this.tileWidth  = TILE_WIDTH;
		this.tileHeight = tileHeight;
		this.width      = width;
		this.height     = height;
	}

	/**
	 * Call a callback on each tile in a row.
	 *
	 * @param {integer}  rowIndex
	 * @param {Function} callback - (x, tile)
	 */
	forEach ( rowIndex, callback )
	{
		const { width, height, tiles } = this;

		if ( rowIndex < 0  ||  rowIndex >= height )
		{
			return;
		}

		const row = tiles[rowIndex];

		for ( let x = 0;  x < width;  x++ )
		{
			callback (x, row[x]);
		}
	}

	/**
	 * Set tile bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 * @param {0|1}     bool
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

		this.tiles[y][x] = +(!!bool);
	}

	/**
	 * Get tile bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 *
	 * @returns {-1|0|1} -1 if invalid coordinate.
	 */
	getTile ( x, y )
	{
		if ( x < 0  ||  x >= this.width )
		{
			return -1;
		}

		if ( y < 0  ||  y >= this.height )
		{
			return -1;
		}

		return this.tiles[y][x];
	}
}

/**
 * Creates an empty (160x192) playfield with a specific tileHeight.
 *
 * @param {integer} tileHeight - The height each tile will be -- must be a divisor of 192.
 *
 * @returns {Tilemap}
 */
const createEmptyTilemap = ( tileHeight = 16 ) =>
{
	const tileData = [];
	const height   = (PF_HEIGHT_PIXELS / tileHeight);

	for ( let y = 0;  y < height;  y++ )
	{
		const row = [];

		for ( let x = 0;  x < PF_WIDTH_TILES;  x++ )
		{
			row.push (0);
		}

		tileData.push (row);
	}

	return new Tilemap (tileData, tileHeight);
};


export { createEmptyTilemap };

export default Tilemap;
