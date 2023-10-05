const { addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = function override(config, env) {
    config.resolve.fallback = { 
        ...config.resolve.fallback,
        "buffer": require.resolve("buffer/"),
        "timers": require.resolve("timers-browserify"),
        "stream": require.resolve("stream-browserify"),
    };
    return config;
};
