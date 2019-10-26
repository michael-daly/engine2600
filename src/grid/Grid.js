/**
 * An abstract class for holding grid data, for sharing methods between Sprite and Tilemap since
 * they're almost the same.
 */
class Grid
{
	/**
	 * @param {Array[]} gridData   - [ [ ... ], ... ]
	 * @param {integer} [maxWidth] - The maximum width this grid is allowed to be.
	 */
	constructor ( gridData, maxWidth = 1 )
	{
		const height = gridData.length;
		const width  = gridData[0].length;

		if ( width < 1 )
		{
			throw new Error (`Must be at least 1 unit wide`);
		}

		if ( width > maxWidth )
		{
			throw new Error (`Cannot be wider than ${maxWidth} unit(s)`);
		}

		if ( height < 1 )
		{
			throw new Error (`Must be at least 1 unit high`);
		}

		this.data   = gridData;
		this.width  = width;
		this.height = height;
	}

	/**
	 * Call a callback on each block in a row.
	 *
	 * @param {integer}  rowIndex
	 * @param {Function} callback - (x, block)
	 */
	forEach ( rowIndex, callback )
	{
		const { width, height, data } = this;

		if ( rowIndex < 0  ||  rowIndex >= height )
		{
			return;
		}

		const row = data[rowIndex];

		for ( let x = 0;  x < width;  x++ )
		{
			callback (x, row[x]);
		}
	}

	/**
	 * Set block bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 * @param {0|1}     bool
	 */
	setBlock ( x, y, bool )
	{
		if ( x < 0  ||  x >= this.width )
		{
			return;
		}

		if ( y < 0  ||  y >= this.height )
		{
			return;
		}

		this.data[y][x] = +(!!bool);
	}

	/**
	 * Get block bit at (x, y).
	 *
	 * @param {integer} x
	 * @param {integer} y
	 *
	 * @returns {-1|0|1} -1 if invalid coordinate.
	 */
	getBlock ( x, y )
	{
		if ( x < 0  ||  x >= this.width )
		{
			return -1;
		}

		if ( y < 0  ||  y >= this.height )
		{
			return -1;
		}

		return this.data[y][x];
	}
}


export default Grid;
