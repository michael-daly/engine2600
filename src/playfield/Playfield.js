import GridRow from '~/core/GridRow.js';

import { getColor } from '~/palettes/palettes.js';

import
{
	TILE_WIDTH,

	PF_WIDTH_TILES,

	DEF_PF_BG_COL,
	DEF_PF_TILE_COL
}
from '~/playfield/constants.js';


class Playfield
{
	/**
	 * @param {integer} backgroundColor
	 * @param {integer} tileColor
	 */
	constructor ( backgroundColor = DEF_PF_BG_COL, tileColor = DEF_PF_TILE_COL )
	{
		this.backgroundColor = backgroundColor;
		this.tileColor       = tileColor;

		// For the Atari 2600, there is only an image buffer for a single scanline, so if we want a
		// playfield that's not just vertical stripes all the way down, we have to change the buffer
		// manually each scanline.
		this.tiles = new GridRow (PF_WIDTH_TILES);
	}

	/**
	 * Converts an X coordinate to a tile X coordinate.
	 *
	 * @param   {integer} coordX
	 * @returns {integer}
	 */
	coordToTile ( coordX )
	{
		return Math.floor (coordX / TILE_WIDTH);
	}

	/**
	 * @param   {integer} index
	 * @returns {0|1}
	 */
	getTile ( index )
	{
		return this.tiles.getBlock (index);
	}

	/**
	 * Used for changing playfield graphics.
	 *
	 * @param {integer} index
	 * @param {0|1}     bool
	 */
	setTile ( index, bool )
	{
		this.tiles.setBlock (index, bool);
	}

	/**
	 * Shortcut method that combines getTile() and coordToTile()
	 *
	 * @param   {integer} coordX
	 * @returns {-1|0|1}
	 */
	getTileFromCoord ( coordX )
	{
		return this.getTile (this.coordToTile (coordX));
	}

	/**
	 * Shortcut method that combines setTile() and coordToTile()
	 *
	 * @param {integer} coordX
	 * @param {0|1}     bool
	 */
	setTileFromCoord ( coordX, bool )
	{
		this.setTile (this.coordToTile (coordX), bool);
	}
}


export default Playfield;
