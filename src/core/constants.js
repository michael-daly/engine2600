const CANVAS_WIDTH  = 320;
const CANVAS_HEIGHT = 226;

// Pixels' width for Atari 2600 are double their height.
const PIXEL_WIDTH = 2;

const TILE_WIDTH = 4 * PIXEL_WIDTH;

// The playfields' width in tiles.
const PF_WIDTH_TILES = 36;

// The playfields' width in pixels.
const PF_WIDTH_PIXELS = PF_WIDTH_TILES * TILE_WIDTH;

// The playfields' height in pixels.
// (There's no constant for the playfields' height in tiles, since that varies).
const PF_HEIGHT_PIXELS = 192;

const MAX_COLORS = 128;


const constants =
{
	CANVAS_WIDTH,
	CANVAS_HEIGHT,

	PIXEL_WIDTH,

	TILE_WIDTH,

	PF_WIDTH_TILES,
	PF_WIDTH_PIXELS,
	PF_HEIGHT_PIXELS,

	MAX_COLORS,
};


module.exports = Object.freeze (constants);