/**
 * Sets an image data pixel color at (x, y).
 *
 * @param {ImageData} imageData  - The ImageData instance we want to set the pixel color of.
 * @param {integer}   x
 * @param {integer}   y
 * @param {integer[]} colorArray - An [R, G, B, A] color array.
 */
const setPixel = ( imageData, x, y, colorArray ) =>
{
	const { data } = imageData;
	const index    = (x + y * imageData.width) * 4;

	data[index + 0] = colorArray[0];
	data[index + 1] = colorArray[1];
	data[index + 2] = colorArray[2];
	data[index + 3] = colorArray[3];
};


export { setPixel };
