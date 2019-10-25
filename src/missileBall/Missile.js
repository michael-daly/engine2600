import MissileBall  from '~/missileBall/MissileBall.js';
import { getColor } from '~/palettes/palettes.js';


/**
 * Stub class in case we want to overwrite some methods from MissileBall.
 */
class Missile extends MissileBall
{
	constructor ( width, height )
	{
		super (width, height);

		/* 0 - 1 copy of missile.
		   1 - 2 close-spaced copies of missile.
		   2 - 2 medium-spaced copies of missile.
		   3 - 3 close-spaced copies of missile.
		   4 - 2 wide-spaced copies of missile.
		   5 - N/A.
		   6 - 3 medium-spaced copies of missile.
		   7 - N/A. */
		this.modifier = 0;
	}

	// TODO: Custom render method to handle this.modifier exceptions
}


export default Missile;
