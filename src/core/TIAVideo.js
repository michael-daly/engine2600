import has from 'has';

import TIACollision  from '~/core/TIACollision.js';
import EventEmitter  from '~/utility/classes/EventEmitter.js';
import Playfield     from '~/playfield/Playfield.js';
import Player        from '~/player/Player.js';
import MissileBall   from '~/missileBall/MissileBall.js';

import { coordToTile } from '~/utility/snapCoord.js';
import { getColor }    from '~/palettes/palettes.js';

import { TILE_WIDTH } from '~/playfield/constants.js';


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
		this.palette      = palette;
		this.events       = new EventEmitter ();
		this.tiaCollision = new TIACollision ();
		this.playfield    = new Playfield ();
		this.player0      = new Player ();
		this.player1      = new Player ();
		this.ball         = new MissileBall ();
		this.missile0     = new MissileBall ();
		this.missile1     = new MissileBall ();
		this.scanline     = 0;
		this.pixel        = 0;
	}

	renderPlayfield ( renderBuffer )
	{
		const { playfield, tiaCollision, scanline, pixel, palette } = this;

		const tileX = coordToTile (pixel, TILE_WIDTH);
		const tile  = playfield.getTile (tileX);

		if ( tile === -1 )
		{
			return;
		}

		const colorRGBA = getColor (palette, tile ? playfield.tileColor : playfield.backgroundColor);

		renderBuffer.drawPixel (pixel, scanline, colorRGBA);

		if ( tile === 1 )
		{
			tiaCollision.addObjectToPixel ('playfield');
		}
	}

	renderBall ( renderBuffer )
	{
		const { playfield, ball, tiaCollision, scanline, pixel, palette } = this;

		if ( !ball.isRenderCoord (pixel)  ||  !ball.enabled )
		{
			return;
		}

		renderBuffer.drawPixel (pixel, scanline, getColor (palette, playfield.tileColor));

		tiaCollision.addObjectToPixel ('ball');
	}

	renderPlayer ( renderBuffer, playerKey )
	{
		const player = this[playerKey];

		if ( !(player instanceof Player) )
		{
			return;
		}

		const { tiaCollision, scanline, pixel, palette } = this;

		if ( player.coordToPixel (pixel) === 1 )
		{
			renderBuffer.drawPixel (pixel, scanline, getColor (palette, player.color));

			tiaCollision.addObjectToPixel (playerKey);
		}
	}

	/**
	 * @param   {RenderBuffer} renderBuffer
	 * @returns {ImageData}
	 */
	render ( renderBuffer )
	{
		const { events, palette } = this;
		const { tiaCollision, playfield, player0, player1, ball, missile0, missile1 } = this;

		// Fallback color if nothing gets drawn.
		const baseColor = getColor (palette, 0);

		this.scanline = 0;

		// Scanline-by-scanline.
		for ( let scanline = 0;  scanline < renderBuffer.height;  scanline++ )
		{
			// Set the scanline property rather than directly modify it every time so it looks cleaner.
			this.scanline = scanline;

			events.emit ('scanline', scanline);

			this.pixel = 0;

			// Pixel-by-pixel.
			for ( let pixel = 0;  pixel < renderBuffer.width;  pixel++ )
			{
				this.pixel = pixel;

				renderBuffer.drawPixel (pixel, scanline, baseColor);

				this.renderPlayfield (renderBuffer);
				this.renderBall (renderBuffer);
				this.renderPlayer (renderBuffer, 'player1');
				this.renderPlayer (renderBuffer, 'player0');

				tiaCollision.setPixelCollisions ();
				tiaCollision.clearPixelObjects ();
			}
		}

		return renderBuffer.imageData;
	}
}


export default TIAVideo;
