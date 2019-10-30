import Playfield   from '~/playfield/Playfield.js';
import Player      from '~/player/Player.js';
import MissileBall from '~/missileBall/MissileBall.js';


/**
 * Separate class for storing TIAVideo objects.
 */
class TIAObjects
{
	constructor ()
	{
		this.playfield = new Playfield ();
		this.player0   = new Player ();
		this.player1   = new Player ();
		this.ball      = new MissileBall ();
		this.missile0  = new MissileBall ();
		this.missile1  = new MissileBall ();
	}

	/**
	 * Function for getting players and missiles.
	 *
	 * @param {"player"|"missile"} type
	 * @param {0|1}                number
	 */
	_getNumberedObject ( type, number )
	{
		switch ( number )
		{
			case 0:
			case 1:
			{
				return this[`${type}${number}`];
			}

			default:
			{
				return null;
			}
		}
	}

	/**
	 * @param {0|1} number
	 */
	getMissile ( number )
	{
		return this._getNumberedObject ('missile', number);
	}

	/**
	 * @param {0|1} number
	 */
	getPlayer ( number )
	{
		return this._getNumberedObject ('player', number);
	}
}


export default TIAObjects;
