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
		this.tiles           = new GridRow (PF_WIDTH_TILES);
		this.backgroundColor = backgroundColor;
		this.tileColor       = tileColor;
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
}


export default Playfield;
