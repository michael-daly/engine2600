import
{
	PF_TILE_WIDTH,
	PF_WIDTH_TILES,
	PF_HEIGHT_PIXELS,
	PF_WIDTH_PIXELS,

	MAX_COLORS,
}
from '~/core/constants.js';

import { setPixel }    from '~/utility/imageData.js';
import { createArray } from '~/utility/createArray.js';


class Playfield
{
	constructor ( tileHeight = 8 )
	{
		if ( PF_HEIGHT_PIXELS % tileHeight !== 0 )
		{
			throw new Error (`\`tileHeight\` must be a divisor of ${PF_HEIGHT_PIXELS}`);
		}

		const height = PF_HEIGHT_PIXELS / tileHeight;

		this.tiles = createArray (height, () =>
		{
			return { rowColor: 0, rowTiles: createArray (PF_WIDTH_TILES, () => 0) };
		});

		this.height     = height;
		this.tileHeight = tileHeight;
		this.imageData  = new ImageData (PF_WIDTH_PIXELS, PF_HEIGHT_PIXELS);
		this.isDeleted  = false;
	}

	delete ()
	{
		delete this.tiles;
		delete this.height;
		delete this.tileHeight;
		delete this.imageData;

		this.isDeleted = true;
	}

	clearTiles ()
	{
		const { height } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			this.tiles[y].rowTiles = createArray (PF_WIDTH_TILES, () => 0);
		}
	}

	setTile ( x, y, bool )
	{
		if ( x < 0  ||  x >= PF_WIDTH_TILES )
		{
			return;
		}

		const { tiles } = this;

		if ( y < 0  ||  y >= tiles.length )
		{
			return;
		}

		tiles[y].rowTiles[x] = +(!!bool);
	}

	setRowColor ( rowIndex, colorIndex )
	{
		if ( colorIndex < 0  ||  colorIndex >= MAX_COLORS )
		{
			return;
		}

		if ( rowIndex < 0  ||  rowIndex >= PF_WIDTH_TILES )
		{
			return;
		}

		this.tiles[rowIndex].rowColor = colorIndex;
	}
}


export default Playfield;
