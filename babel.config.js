module.exports = function (api) {
  api.cache(true)
module.exports = {
  
  presets:[
    
    'babel-preset-expo',
    // "@babel/preset-react",

],
plugins: [
    ['module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        
      }]
  ],
};
};
