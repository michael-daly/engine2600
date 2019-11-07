/**
 * Sets an image data pixel color at (x, y).
 *
 * @param {ImageData} imageData - The ImageData instance we want to set the pixel color of.
 * @param {integer}   x
 * @param {integer}   y
 * @param {ColorRGBA} colorRGBA
 */
const setPixel = ( imageData, x, y, colorRGBA ) =>
{
	const { data } = imageData;
	const index    = (x + y * imageData.width) * 4;

	data[index + 0] = colorRGBA[0];
	data[index + 1] = colorRGBA[1];
	data[index + 2] = colorRGBA[2];
	data[index + 3] = colorRGBA[3];
};


export { setPixel };
