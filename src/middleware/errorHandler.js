/**
 * Centralized error handler middleware.
 * Ensures uniform error formatting and prevents leaking stack traces in production.
 */
export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  const response = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred.',
    },
  };

  if (!isProd && err.stack) {
    response.error.stack = err.stack;
  }

  // Always log critical errors
  if (statusCode >= 500) {
    console.error(`[Server Error] ${req.method} ${req.url}:`, err);
  }

  res.status(statusCode).json(response);
}
