const CANVAS_WIDTH  = 320;
const CANVAS_HEIGHT = 226;

const PIXEL_WIDTH = 2;  // Pixels' width for Atari 2600 are double their height.

const PF_TILE_WIDTH    = 4 * PIXEL_WIDTH;
const PF_WIDTH_TILES   = 36;
const PF_WIDTH_PIXELS  = PF_WIDTH_TILES * PF_TILE_WIDTH;
const PF_HEIGHT_PIXELS = 192;

const MAX_COLORS = 128;


const constants =
{
	CANVAS_WIDTH,
	CANVAS_HEIGHT,

	PIXEL_WIDTH,

	PF_TILE_WIDTH,
	PF_WIDTH_TILES,
	PF_WIDTH_PIXELS,
	PF_HEIGHT_PIXELS,

	MAX_COLORS,
};


module.exports = Object.freeze (constants);
