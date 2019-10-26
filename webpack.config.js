const path    = require ('path');
const webpack = require ('webpack');


module.exports =
{
	entry: './src/main.js',

	output:
	{
		filename: 'bundle.js',
		path: path.join (__dirname + '/dist')
	},

	watch: true,
	mode: 'development',

	resolve:
	{
		alias:
		{
			'~/src':         path.resolve (__dirname, './src'),
			'~/core':        path.resolve (__dirname, './src/core'),
			'~/palettes':    path.resolve (__dirname, './src/core/palettes'),
			'~/grid':        path.resolve (__dirname, './src/grid'),
			'~/playfield':   path.resolve (__dirname, './src/playfield'),
			'~/player':      path.resolve (__dirname, './src/player'),
			'~/missileBall': path.resolve (__dirname, './src/missileBall'),
			'~/utility':     path.resolve (__dirname, './src/utility'),
		}
	},

	module:
	{
		rules:
		[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			}
		]
	}
};
