/**
 * Snaps a coordinate position to a grid position.
 *
 * @param {number} value        - The value to snap to the grid.
 * @param {number} gridTileSize - The size of the grid tiles to snap the coordinates to.
 *
 * @returns {number}
 */
const snapToGrid = ( value, gridTileSize ) =>
{
	return Math.floor (value / gridTileSize) * gridTileSize;
};

/**
 * Snaps a coordinate position to a tile position.
 *
 * @param {number} value    - The value to snap to the grid.
 * @param {number} tileSize - The size of the tiles to snap the coordinates to.
 *
 * @returns {number}
 */
const coordToTile = ( value, tileSize ) =>
{
	return Math.floor (value / tileSize);
};


export { snapToGrid, coordToTile };
