import { PIXEL_WIDTH } from '~/core/constants.js';


const TILE_WIDTH = 4 * PIXEL_WIDTH;

// The playfields' width in tiles.
const PF_WIDTH_TILES = 40;

// The playfields' width in pixels.
const PF_WIDTH_PIXELS = PF_WIDTH_TILES * TILE_WIDTH;

// The playfields' height in pixels.
// (There's no constant for the playfields' height in tiles, since that varies).
const PF_HEIGHT_PIXELS = 192;

// Default playfield positions
const DEF_PF_X = 0;
const DEF_PF_Y = 3;

// Default playfield colors
const DEF_PF_BG_COL   = 0;
const DEF_PF_TILE_COL = 6;


export
{
	TILE_WIDTH,

	PF_WIDTH_TILES,
	PF_WIDTH_PIXELS,
	PF_HEIGHT_PIXELS,

	DEF_PF_X,
	DEF_PF_Y,

	DEF_PF_BG_COL,
	DEF_PF_TILE_COL,
};
