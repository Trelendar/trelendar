// const withImages = require('next-images')

// module.exports = withImages()
//next.config.js file
module.exports = {
  webpack(config) {
    config.resolve.modules.push(__dirname);
    return config;
  },
};
