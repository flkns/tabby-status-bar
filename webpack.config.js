const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');

const eslintOptions = {
	extensions: ['js', 'ts'],
	exclude: ['node_modules', 'dist'],
};

module.exports = {
	target: 'node',
	entry: 'src/index.ts',
	devtool: 'source-map',
	context: __dirname,
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		pathinfo: true,
		libraryTarget: 'umd',
		devtoolModuleFilenameTemplate:
			'webpack-tabby-status-bar:///[resource-path]',
	},
	plugins: [new ESLintPlugin(eslintOptions)],
	resolve: {
		modules: ['.', 'src', 'node_modules'].map((x) => path.join(__dirname, x)),
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					configFile: path.resolve(__dirname, 'tsconfig.json'),
				},
			},
			{
				test: /\.scss/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{ test: /\.pug$/, use: ['apply-loader', 'pug-loader'] },
		],
	},
	externals: [
		'fs',
		'ngx-toastr',
		/^rxjs/,
		/^@angular/,
		/^@ng-bootstrap/,
		/^tabby-/,
	],
};
