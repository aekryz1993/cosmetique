module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-classname-to-style',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'react-native-platform-specific-extensions',
      {
        extensions: ['css', 'scss', 'sass'],
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
