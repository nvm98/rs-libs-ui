export default {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        node: '14'
      }
    }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  exclude: 'node_modules/**',
};
