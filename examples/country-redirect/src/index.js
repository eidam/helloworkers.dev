export default {
  async fetch(request) {
    // redirect requests from Portugal to workers.cloudflare.com
    if (request.cf.country === "PT") {
      return Response.redirect("https://workers.cloudflare.com")
    }

    return new Response("Hello World")
  },
};
