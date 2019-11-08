import SetMap from '~/utility/classes/SetMap.js';


/**
 * A data structure used for linking two values together.
 */
class ValueLinker
{
	constructor ()
	{
		this.values = new SetMap ();
	}

	/**
	 * Link two values to each other.
	 *
	 * @param {*} value1
	 * @param {*} value2
	 */
	link ( value1, value2 )
	{
		this.values.add (value1, value2);
		this.values.add (value2, value1);
	}

	/**
	 * Unlink two values from each other.
	 *
	 * @param {*} value1
	 * @param {*} value2
	 */
	unlink ( value1, value2 )
	{
		this.values.remove (value1, value2);
		this.values.remove (value2, value1);
	}

	/**
	 * Clears all links between all values.
	 */
	clear ()
	{
		this.values.clear ();
	}

	/**
	 * Check if two values are linked to each other.
	 *
	 * @param {*} value1
	 * @param {*} value2
	 */
	linked ( value1, value2 )
	{
		return this.values.has (value1, value2)  &&  this.values.has (value2, value1);
	}
}


export default ValueLinker;
