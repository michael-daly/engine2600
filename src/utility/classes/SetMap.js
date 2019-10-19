/**
 * A data structure for storing multiple values in the same key.  A map of sets, if you will.
 */
class SetMap
{
	constructor ()
	{
		this.map = new Map ();
	}

	/**
	 * Adds a value to the key.
	 *
	 * @param {string} key   - The key to add a value to.
	 * @param {*}      value - The value we want to add.
	 */
	add ( key, value )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			map.set (key, new Set ());
		}

		map.get (key).add (value);
	}

	/**
	 * Deletes a value from a key, or, alternatively, deletes all values at a key.
	 *
	 * @param {string} key     - The key we want to delete a value/values from.
	 * @param {*}      [value] - The value we want to remove.  If not specified, all values mapped
	 *                           to the key will be removed.
	 */
	delete ( key, value )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			return;
		}

		const set = map.get (key);

		if ( arguments.length === 1 )
		{
			set.clear ();
		}
		else
		{
			set.delete (value);

		}

		if ( set.size <= 0 )
		{
			map.delete (key);
		}
	}

	/**
	 * Get all values at a key.
	 *
	 * @param {string} key
	 *
	 * @returns {Set|null} The Set of values at the key, or null if there are no values.
	 */
	get ( key )
	{
		const { map } = this;

		if ( map.has (key) )
		{
			return map.get (key);
		}

		return null;
	}

	/**
	 * Checks if it has a value mapped to the key.
	 *
	 * @param {string} key     - Key we want to check.
	 * @param {*}      [value] - If not specified, we will check if there's anything mapped to the
	 *                           key at all.
	 *
	 * @returns {boolean}
	 */
	has ( key, value )
	{
		if ( arguments.length === 1 )
		{
			return map.has (key);
		}

		return map.has (key)  &&  map.get (key).has (value);
	}

	/**
	 * Clears all sets and everything else in the map.
	 */
	clear ()
	{
		const { map } = this;

		for ( let [key, set] of map )
		{
			set.clear ();
		}

		map.clear ();
	}

	/**
	 * Calls a callback function for all values mapped to the key.
	 *
	 * @param {string}   key
	 * @param {Function} callback
	 */
	forEach ( key, callback )
	{
		const { map } = this;

		if ( !map.has (key) )
		{
			return;
		}

		const set = map.get (key);

		for ( let value of set )
		{
			callback (value);
		}
	}
}


export default SetMap;