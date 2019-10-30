import ValueLinker from '~/utility/classes/ValueLinker.js';


const validObjects = new Set (['playfield', 'player0', 'player1', 'ball', 'missile0', 'missile1']);

/**
 * Separate class for handling TIAVideo collisions.
 */
class TIACollision
{
	constructor ()
	{
		this.objectsAtPixel = new Set ();
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
		if ( validObjects.has (object1)  &&  validObjects.has (object2) )
		{
			this.collisions.link (object1, object2);
		}
	}

	/**
	 * Clear all collisions and objects at the pixel.
	 */
	clearCollisions ()
	{
		this.objectsAtPixel.clear ();
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
		if ( validObjects.has (object) )
		{
			this.objectsAtPixel.add (object);
		}
	}

	/**
	 * Clear all objects at the pixel.
	 */
	clearPixelObjects ()
	{
		this.objectsAtPixel.clear ();
	}

	/**
	 * Goes through each object being drawn at the current pixel and sets collisions between them.
	 */
	setPixelCollisions ()
	{
		const { objectsAtPixel } = this;

		for ( let object1 of objectsAtPixel )
		{
			for ( let object2 of objectsAtPixel )
			{
				if ( object1 !== object2 )
				{
					this.setCollision (object1, object2);
				}
			}
		}
	}
}


export default TIACollision;
