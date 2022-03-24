export default {
  async fetch(request, env, ctx) {

    const url = new URL(request.url)

    if (url.pathname === "/setup-kv") {
      // quick way to setup all redirects
      const redirects = {
        "/workers": "https://workers.cloudflare.com",
        "/cloudflare": "https://cloudflare.com",
        "/examples": "https://github.com/eidam/helloworkers.dev",
        "/discord": "https://discord.gg/cloudflaredev",
        "/docs": "https://developers.cloudflare.com/workers",
        "/twitter": "https://twitter.com/cloudflaredev",
      }

      // one-off KV put
      // await env.KV_REDIRECTS.put("/workers", "https://workers.cloudflare.com")

      // or add all from redirects variable
      await Promise.all(Object.keys(redirects).map(async path => {
        await env.KV_REDIRECTS.put(path, redirects[path])
      }))

      // Once saved, return success
      return new Response("Success!")
    }

    // lookup URL pathname in KV, redirect if found
    const redirect = await env.KV_REDIRECTS.get(url.pathname) // value | null
    if (redirect) {
      console.log(`redirecting to ${redirect}`)
      return Response.redirect(redirect, 302)
    }

    // otherwise, return Hello World!
    return new Response("Hello World!");
  },
}

