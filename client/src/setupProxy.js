const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://port-0-word-game-project-euegqv2blncvirzp.sel5.cloudtype.app',  // 이 부분을 변경
      changeOrigin: true,
      logLevel: 'debug',  
      onError: (err, req, res) => {  
        console.log(err);
      },
      onProxyRes: (proxyRes, req, res) => {
      },
      onProxyReq: (proxyReq, req, res) => {
      },
    })
  );
};
