import Grid from '~/grid/Grid.js';

import { TILE_WIDTH, PF_WIDTH_TILES, PF_HEIGHT_PIXELS } from '~/playfield/constants.js';


/**
 * A class for holding playfield data.
 */
class Tilemap extends Grid
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
		if ( PF_HEIGHT_PIXELS % tileHeight !== 0 )
		{
			throw new Error (`\`tileHeight\` must be a divisor of ${PF_HEIGHT_PIXELS}`);
		}
	
		super (tileData, PF_WIDTH_TILES);

		this.tileWidth  = TILE_WIDTH;
		this.tileHeight = tileHeight;
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
