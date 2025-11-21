const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy pour toutes les routes API
  app.use(
    ['/auth', '/admin'],
    createProxyMiddleware({
      target: 'https://ecopower-api.vercel.app',
      changeOrigin: true,
      secure: true,
      logLevel: 'silent',
      // Important : préserver les headers de la requête originale
      headers: {
        'Connection': 'keep-alive',
      },
      onProxyReq: (proxyReq, req, _res) => {
        // S'assurer que le header Authorization est transmis
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (authHeader && !proxyReq.getHeader('authorization')) {
          proxyReq.setHeader('authorization', authHeader);
        }
      },
      onError: (err, _req, _res) => {
        console.error('Erreur proxy:', err.message);
      }
    })
  );
};

