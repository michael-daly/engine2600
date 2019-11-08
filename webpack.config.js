const path    = require ('path');
const webpack = require ('webpack');

const isProduction = process.env.NODE_ENV === 'production';


module.exports =
{
	entry: './src/main.js',

	output:
	{
		path:          path.join (__dirname + '/dist'),
		filename:      'bundle.js',
		library:       'engine2600',
		libraryTarget: 'umd',
	},

	mode: isProduction ? 'production' : 'development',

	resolve:
	{
		alias:
		{
			'~/src':         path.resolve (__dirname, './src'),
			'~/core':        path.resolve (__dirname, './src/core'),
			'~/TIA':         path.resolve (__dirname, './src/core/TIA'),
			'~/palettes':    path.resolve (__dirname, './src/core/palettes'),
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
				test:    /\.jsx?$/,
				exclude: /node_modules/,
				loader:  'babel-loader',
			}
		]
	}
};
