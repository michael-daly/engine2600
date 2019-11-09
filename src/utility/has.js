/**
 * Safe wrapper for `object.hasOwnProperty()`
 *
 * @param {Object} object
 * @param {string} key
 *
 * @returns {boolean}
 */
const has = ( object, key ) =>
{
	return Object.prototype.hasOwnProperty.call (object, key);
};


export default has;
