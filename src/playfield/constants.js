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
const DEFAULT_PF_X = 0;
const DEFAULT_PF_Y = 4;


export
{
	TILE_WIDTH,

	PF_WIDTH_TILES,
	PF_WIDTH_PIXELS,
	PF_HEIGHT_PIXELS,

	DEFAULT_PF_X,
	DEFAULT_PF_Y,
};
