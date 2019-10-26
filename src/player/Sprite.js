import Grid from '~/grid/Grid.js';

import { MAX_SPRITE_WIDTH } from '~/player/constants.js';


/**
 * A class for holding player sprite data.
 */
class Sprite extends Grid
{
	/**
	 * @param {Array[]} pixelData - [ [ ... ], ... ]
	 */
	constructor ( pixelData )
	{
		super (pixelData, MAX_SPRITE_WIDTH);
	}
}


export default Sprite;
