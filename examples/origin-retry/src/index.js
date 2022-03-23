export default {
  async fetch(request) {
    // fake 503 timeout with 2s delay
    const response = await fetch("https://httpstat.us/503?sleep=2000")

    // check if response status is 2xx (.ok is shortcut)
    // if not, retry once
    if (!response.ok) {
      const retry = await fetch("https://httpstat.us/200")
      return retry
    } else {
      return response
    }
  },
};
