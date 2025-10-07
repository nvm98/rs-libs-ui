import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
      alias({
        entries: [
          { find: '@email-template', replacement: path.resolve(__dirname, 'src/components/email-template') },
          { find: '@sms-template', replacement: path.resolve(__dirname, 'src/components/sms-template') },
          { find: '@web-push-template', replacement: path.resolve(__dirname, 'src/components/web-push-template') },
          { find: '@whatsapp-template', replacement: path.resolve(__dirname, 'src/components/whatsapp-template') },
          { find: '@shared', replacement: path.resolve(__dirname, 'src/components/shared') },
        ]
      }),
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
    plugins: [
      alias({
        entries: [
          { find: '@email-template', replacement: path.resolve(__dirname, 'src/components/email-template') },
          { find: '@sms-template', replacement: path.resolve(__dirname, 'src/components/sms-template') },
          { find: '@web-push-template', replacement: path.resolve(__dirname, 'src/components/web-push-template') },
          { find: '@whatsapp-template', replacement: path.resolve(__dirname, 'src/components/whatsapp-template') },
          { find: '@shared', replacement: path.resolve(__dirname, 'src/components/shared') },
        ]
      }),
      dts()
    ],
    external: [/\.css$/],
  },
];
