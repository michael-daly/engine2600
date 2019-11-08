import { createArray } from '~/utility/createArray.js';


/**
 * Shared class between playfield and players.
 *
 * Used for setting tiles for the playfield, and setting pixels for players.
 */
class GridRow
{
	/**
	 * @param {integer} length - Number of units in the row.
	 */
	constructor ( length )
	{
		this.row = Object.seal (createArray (length, 0));
	}

	/**
	 * @param {Function} callback - `(index, tile)`
	 */
	forEach ( callback )
	{
		const { row } = this;

		for ( let i = 0;  i < row.length;  i++ )
		{
			callback (i, row[i]);
		}
	}

	/**
	 * @param   {integer} index
	 * @returns {boolean}
	 */
	isValidIndex ( index )
	{
		return index >= 0  &&  index < this.row.length;
	}

	/**
	 * Get block bit at index.
	 *
	 * @param   {integer} index
	 * @returns {-1|0|1}  -1 if the index is invalid.
	 */
	getBlock ( index )
	{
		if ( !this.isValidIndex (index) )
		{
			return -1;
		}

		return this.row[index];
	}

	/**
	 * Set block bit at index.
	 *
	 * @param {integer} index
	 * @param {0|1}     bool
	 */
	setBlock ( index, bool )
	{
		if ( !this.isValidIndex (index) )
		{
			return;
		}

		this.row[index] = +(!!bool);
	}
}


export default GridRow;
