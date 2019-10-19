import { CANVAS_WIDTH, CANVAS_HEIGHT } from '~/core/constants.js';


/**
 * Creates a canvas and appends it to an element.
 *
 * @param {string} elementID - The ID of the element we want to append our canvas to.
 * @param {number} scale     - How much to scale up the fixed-resolution (320x226) canvas.
 *
 * @returns {HTMLCanvasElement}
 */
const createCanvas = ( elementID, scale ) =>
{
	const canvas  = document.createElement ('canvas');
	canvas.width  = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	// Scale the canvas up and make sure it's not blurry.
	canvas.style['image-rendering']  = 'crisp-edges';
	canvas.style['transform-origin'] = 'left top';
	canvas.style['transform']        = `scale(${scale})`;

	document.getElementById (elementID).appendChild (canvas);

	return canvas;
};


export default createCanvas;
