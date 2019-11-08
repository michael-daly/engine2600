import ValueLinker from '~/utility/classes/ValueLinker.js';


/**
 * Separate class for handling TIAVideo collisions.
 */
class TIACollision
{
	constructor ()
	{
		/**
		 * Array for storing all the objects that are at the current pixel.
		 *
		 * For each pixel on the screen, all objects that are being drawn get added to this array, then
		 * `setPixelCollisions()` is called to set collisions between all objects at the current pixel.
		 *
		 * The array is then cleared with `clearPixelObjects()` and the process restarts.
		 */
		this.objectsAtPixel = [];

		/**
		 * Used for storing all collisions between objects.
		 *
		 * Use `checkCollision(object1, object2)` to check collisions between two objects.
		 *
		 * Like the actual Atari 2600, collisions must be cleared manually using `clearCollisions()`
		 */
		this.collisions = new ValueLinker ();
	}

	/**
	 * @param {Playfield|Player|MissileBall} object1
	 * @param {Playfield|Player|MissileBall} object2
	 *
	 * @private
	 */
	_setCollision ( object1, object2 )
	{
		this.collisions.link (object1, object2);
	}

	/**
	 * Clears collisions between all objects.
	 */
	clearCollisions ()
	{
		this.collisions.clear ();
	}

	/**
	 * @param {Playfield|Player|MissileBall} object1
	 * @param {Playfield|Player|MissileBall} object2
	 *
	 * @returns {boolean}
	 */
	checkCollision ( object1, object2 )
	{
		return this.collisions.linked (object1, object2);
	}

	/**
	 * Adds object to `objectsAtPixels` array to indicate it's being drawn at the current pixel.
	 *
	 * @param {Playfield|Player|MissileBall} object
	 */
	addObjectToPixel ( object )
	{
		const { values } = this.collisions;

		// Minor optimization if all other objects are already colliding with this object.
		if ( values.has (object)  &&  values.get (object).size >= 5 )
		{
			return;
		}

		this.objectsAtPixel.push (object);
	}

	/**
	 * Clears all the objects at the current pixel.
	 */
	clearPixelObjects ()
	{
		this.objectsAtPixel = [];
	}

	/**
	 * Sets collisions between all objects being drawn at the current pixel.
	 */
	setPixelCollisions ()
	{
		const { objectsAtPixel } = this;
		const { length } = objectsAtPixel;

		for ( let i = 0;  i < length;  i++ )
		{
			const object1 = objectsAtPixel[i];

			for ( let j = 0;  j < length;  j++ )
			{
				const object2 = objectsAtPixel[j];

				// An object can't collide with itself, obviously.
				if ( object1 !== object2 )
				{
					this._setCollision (object1, object2);
				}
			}
		}
	}
}


export default TIACollision;
