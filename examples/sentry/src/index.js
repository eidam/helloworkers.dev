import Toucan from 'toucan-js';

export default {
  async fetch(request, env, ctx) {
    const sentry = new Toucan({
      // wrangler secret put SENTRY_DSN
      dsn: env.SENTRY_DSN,
      ctx, // Includes 'waitUntil', which is essential for Sentry logs to be delivered. Modules workers do not include 'request' in context -- you'll need to set it separately.
      request, // request is not included in 'context', so we set it here.
      allowedHeaders: ['user-agent'],
      allowedSearchParams: /(.*)/,
    });

    try {
      // Your code
      
      return new Response('OK', {
        status: 200,
        statusText: 'OK',
      });
    } catch (err) {
      sentry.captureException(err);
      return new Response('Something went wrong', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }
  },
};
