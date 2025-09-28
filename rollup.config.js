import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';


export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: false,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        exclude: 'node_modules/**',
      }),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
        exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.ts'],
      }),
      commonjs({
        include: ['node_modules/**'],
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
