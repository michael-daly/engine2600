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


class Playfield
{
	constructor ( tileHeight = 16, bgColor = 0, tileColor = 7 )
	{
		if ( PF_HEIGHT_PIXELS % tileHeight !== 0 )
		{
			throw new Error (`\`tileHeight\` must be a divisor of ${PF_HEIGHT_PIXELS}`);
		}

		const height = PF_HEIGHT_PIXELS / tileHeight;

		this.tiles = createArray (height, () =>
		{
			return { bgColor, tileColor, rowTiles: createArray (PF_WIDTH_TILES, () => 0) };
		});

		this.height     = height;
		this.tileHeight = tileHeight;
		this.imageData  = new ImageData (PF_WIDTH_PIXELS, PF_HEIGHT_PIXELS);
		this.isDeleted  = false;

		this.updateAllTiles ();
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

	getTile ( x, y )
	{
		return this.tiles[y].rowTiles[x];
	}

	getBackgroundColor ( rowIndex )
	{
		return this.tiles[rowIndex].bgColor;
	}

	getTileColor ( rowIndex )
	{
		return this.tiles[rowIndex].tileColor;
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

		this.updateTile (x, y);
	}

	setBackgroundColor ( rowIndex, colorIndex )
	{
		this.tiles[rowIndex].bgColor = colorIndex;
		this.updateRow (rowIndex);
	}

	setTileColor ( rowIndex, colorIndex )
	{
		this.tiles[rowIndex].tileColor = colorIndex;
		this.updateRow (rowIndex);
	}

	updateAllTiles ()
	{
		const { height } = this;

		for ( let y = 0;  y < height;  y++ )
		{
			this.updateRow (y);
		}
	}

	updateRow ( rowIndex )
	{
		const row = this.tiles[rowIndex];

		for ( let x = 0;  x < PF_WIDTH_TILES;  x++ )
		{
			this.updateTile (x, rowIndex);
		}
	}

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
