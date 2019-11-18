import TIA         from '~/TIA/TIA.js';
import TIAVideo    from '~/TIA/TIAVideo.js';
import Playfield   from '~/playfield/Playfield.js';
import MissileBall from '~/missileBall/MissileBall.js';
import Player      from '~/player/Player.js';

import deepFreeze   from '~/utility/deepFreeze.js';
import createCanvas from '~/utility/createCanvas.js';

import { CANVAS_WIDTH, CANVAS_HEIGHT, NUM_COLORS } from '~/core/constants.js';

import { TILE_WIDTH, PF_WIDTH_TILES } from '~/playfield/constants.js';

import { PLAYER_WIDTH } from '~/player/constants.js';


/**
 * Engine2600
 *
 * @namespace
 */
const Engine2600 =
{
	/**
	 * Creates a TIA instance, creating a canvas and appending it to a parent element.
	 *
	 * @param {string}               parentID      - The ID of the element we want to append our canvas to.
	 * @param {number}               [canvasScale] - How much to scale up/down our canvas element.
	 * @param {"NTSC"|"PAL"|"SECAM"} [palette]     - Which color palette to use.
	 *
	 * @returns {TIA}
	 */
	createTIA ( parentID, canvasScale = 3.0, palette = 'NTSC' )
	{
		const canvas = createCanvas (parentID, canvasScale);
		const video  = new TIAVideo (palette);
		const audio  = null;  // TODO: TIAAudio

		return new TIA (canvas, video, audio);
	},

	/**
	 * @param   {*} object
	 * @returns {boolean}
	 */
	isPlayfield ( object )
	{
		return object instanceof Playfield;
	},

	/**
	 * @param   {*} object
	 * @returns {boolean}
	 */
	isMissileBall ( object )
	{
		return object instanceof MissileBall;
	},

	/**
	 * @param   {*} object
	 * @returns {boolean}
	 */
	isPlayer ( object )
	{
		return object instanceof Player;
	},

	// Various useful constants that are also used internally by the engine.
	constants:
	{
		CANVAS_WIDTH,
		CANVAS_HEIGHT,

		NUM_COLORS,

		TILE_WIDTH,
		PF_WIDTH_TILES,

		PLAYER_WIDTH,
	},
};


export default deepFreeze (Engine2600);
