const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

// Route: Resume API
app.use('/api/resume', createProxyMiddleware({
  target: 'http://resume-api:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/resume': '/resume', // Remove /api prefix when forwarding
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(503).json({ error: 'Resume service unavailable' });
  }
}));

// Future APIs will be added here
// app.use('/api/blog', createProxyMiddleware({ target: 'http://blog-api:3002', ... }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  - GET /health');
  console.log('  - GET /api/resume');
});
