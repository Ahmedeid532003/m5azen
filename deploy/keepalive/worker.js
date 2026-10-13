// Pings the backend every few minutes so the free Render instance does not go to sleep.
export default {
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(fetch(`${env.BACKEND_URL}/api/health`, { headers: { 'User-Agent': 'm5azen-keepalive' } }));
  },
  async fetch(_request, env) {
    const res = await fetch(`${env.BACKEND_URL}/api/health`);
    return new Response(`backend ${res.status}`, { status: res.ok ? 200 : 502 });
  },
};
