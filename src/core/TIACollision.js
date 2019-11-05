import ValueLinker from '~/utility/classes/ValueLinker.js';


/**
 * Separate class for handling TIAVideo collisions.
 */
class TIACollision
{
	constructor ()
	{
		this.objectsAtPixel = [];
		this.collisions     = new ValueLinker ();
	}

	/**
	 * Sets collision between two objects.
	 *
	 * @param {string} object1
	 * @param {string} object2
	 */
	setCollision ( object1, object2 )
	{
		this.collisions.link (object1, object2);
	}

	/**
	 * Clear all collisions and objects at the pixel.
	 */
	clearCollisions ()
	{
		this.objectsAtPixel = [];
		this.collisions.clear ();
	}

	/**
	 * @param {string} object1
	 * @param {string} object2
	 */
	checkCollision ( object1, object2 )
	{
		return this.collisions.linked (object1, object2);
	}

	/**
	 * Adds object that's being drawn at the current pixel.
	 *
	 * @param {string} object
	 */
	addObjectToPixel ( object )
	{
		const { values } = this.collisions;

		// Optimization so we don't loop through each object every pixel.
		if ( values.has (object)  &&  values.get (object).size >= 5 )
		{
			return;
		}

		this.objectsAtPixel.push (object);
	}

	/**
	 * Clear all objects at the pixel.
	 */
	clearPixelObjects ()
	{
		this.objectsAtPixel = [];
	}

	/**
	 * Goes through each object being drawn at the current pixel and sets collisions between them.
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

				if ( object1 !== object2 )
				{
					this.setCollision (object1, object2);
				}
			}
		}
	}
}


export default TIACollision;
