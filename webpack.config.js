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
			'~/src':     path.resolve (__dirname, './src'),
			'~/init':    path.resolve (__dirname, './src/init'),
			'~/utility': path.resolve (__dirname, './src/utility'),
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
