module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
    '@babel/proposal-optional-chaining',
    'relay',
  ],
};
