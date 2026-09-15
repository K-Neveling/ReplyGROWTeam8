import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.info(`🚀 Reply GROW Team 8 Server running at http://localhost:${PORT}`);
  console.info('♿ WCAG 2.1 AA Compliant UI ready.');
});

// Graceful shutdown handling
const shutdown = (signal) => {
  console.info(`Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.info('HTTP server closed. Process exiting.');
    process.exit(0);
  });

  // Force exit after 10s if hanging
  setTimeout(() => {
    console.error('Forcing process exit after timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default server;
