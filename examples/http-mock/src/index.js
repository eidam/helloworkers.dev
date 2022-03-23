export default {
  async fetch(request) {
    const url = new URL(request.url)

    const delay = parseInt(url.searchParams.get("delay")) || 0
    const status = parseInt(url.searchParams.get("status")) || 200
    
    // delay request
    await new Promise(r => setTimeout(r, delay));
    

    // return OK by default
    return new Response(`code ${status} delayed by ${delay}ms`);
  },
};
