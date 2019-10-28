import RenderBuffer from '~/core/RenderBuffer.js';
import EventEmitter from '~/utility/classes/EventEmitter.js';
import Playfield    from '~/playfield/Playfield.js';
import Player       from '~/player/Player.js';
import MissileBall  from '~/missileBall/MissileBall.js';

import { getColor }      from '~/palettes/palettes.js';
import { CANVAS_HEIGHT } from '~/core/constants.js';


/**
 * A class that emulates the behavior of the video portion of the TIA in the Atari 2600.
 */
class TIAVideo
{
	/**
	 * @param {string} palette
	 */
	constructor ( palette = 'NTSC' )
	{
		this.palette   = palette;
		this.events    = new EventEmitter ();
		this.playfield = new Playfield ();
		this.player0   = new Player ();
		this.player1   = new Player ();
		this.ball      = new MissileBall ();
		this.missile0  = new MissileBall ();
		this.missile1  = new MissileBall ();
	}

	/**
	 * @param   {RenderBuffer} renderBuffer
	 * @returns {ImageData}
	 */
	render ( renderBuffer )
	{
		const { events, palette, playfield, player0, player1, ball, missile0, missile1 } = this;

		for ( let scanline = 0;  scanline < CANVAS_HEIGHT;  scanline++ )
		{
			events.emit ('scanline', scanline);

			playfield.render (renderBuffer, palette, scanline);
			ball.render (renderBuffer, getColor (palette, playfield.tileColor), scanline);

			player0.render (renderBuffer, palette, scanline);
			missile0.render (renderBuffer, getColor (palette, playfield.tileColor), scanline);

			player1.render (renderBuffer, palette, scanline);
			missile1.render (renderBuffer, getColor (palette, playfield.tileColor), scanline);
		}

		return renderBuffer.imageData;
	}
}


export default TIAVideo;
