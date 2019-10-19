/**
 * Draw a filled rectangle on a canvas context.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {string}                   color   - An RGBA string separated by commas.
 * @param {integer}                  x
 * @param {integer}                  y
 * @param {integer}                  width
 * @param {integer}                  height
 */
const drawFillRect = ( context, color, x, y, width, height ) =>
{
	context.fillStyle = `rgba(${color})`;
	context.fillRect (x, y, width, height);
};


export { drawFillRect };
