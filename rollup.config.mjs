import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import sizes from 'rollup-plugin-sizes';

/** @type {import('rollup').RollupOptions} */
export default {
	input: 'listing.mjs',
	output: {
		dir: 'dist-rollup',
		format: 'es'
	},
	plugins: [
		commonjs(),
		json(),
		resolve({
			preferBuiltins: true
		}),
		terser(),
		sizes()
	]
}
