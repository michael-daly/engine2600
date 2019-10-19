const drawFillRect = ( context, color, x, y, width, height ) =>
{
	context.fillStyle = `rgba(${color})`;
	context.fillRect (x, y, width, height);
};


export { drawFillRect };
