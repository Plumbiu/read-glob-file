import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		format: 'es',
	},
	plugins: [
		commonjs(),
		nodeResolve({
			preferBuiltins: true,
			exportConditions: ['node'],
		}),
		typescript(),
		terser(),
	],
}

