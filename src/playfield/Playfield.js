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

	/**
	 * @param {RenderBuffer} renderBuffer
	 * @param {string}       palette
	 * @param {integer}      scanline
	 */
	render ( renderBuffer, palette, scanline )
	{
		const { tiles, backgroundColor, tileColor } = this;

		const bgRGBA   = getColor (palette, backgroundColor);
		const tileRGBA = getColor (palette, tileColor);

		tiles.forEach (( tileX, tile ) =>
		{
			const colorRGBA = (tile ? tileRGBA : bgRGBA);

			renderBuffer.drawHorizontalLine (tileX * TILE_WIDTH, scanline, TILE_WIDTH, colorRGBA);
		});
	}
}


export default Playfield;
