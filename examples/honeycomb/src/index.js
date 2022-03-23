import { wrapModule } from "@cloudflare/workers-honeycomb-logger"

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    request.tracer.log('make blocking fetch request')
    await request.tracer.fetch('https://httpstat.us/200?sleep=2000')

    request.tracer.log('make 5 parallel fetch requests')
    await Promise.all([
      request.tracer.fetch('https://example.com/1'),
      request.tracer.fetch('https://example.com/2'),
      request.tracer.fetch('https://example.com/3'),
      request.tracer.fetch('https://example.com/4'),
    ])

    request.tracer.log('finally, return response')
    return new Response('Hello world!', { status: 200 })
  },
}

// wrangler secret put HONEYCOMB_API_KEY
// wrangler secret put HONEYCOMB_DATASET
const config = {
  //acceptTraceContext?: boolean //Do you want to accept automatic TraceContext information from clients? Defaults to 'false'
  //data?: any //Any data you want to add to every request. Things like service name, version info etc.
  //redactRequestHeaders?: string[] //Array of headers to redact. Will replace value with `REDACTED`. default is ['authorization', 'cookie', 'referer'].
  //redactResponseHeaders?: string[] //Array of headers to redact. Will replace value with `REDACTED`. default is ['set-cookie'].
  //sampleRates?: SampleRates | SampleRateFn //Either an object or function that configured sampling ([See below](#dynamic-sampling))
  //sendTraceContext?: boolean | RegExp //set this to true to send a TraceContext with all fetch requests. With a Regex, we will check the URL against the regex first. Defaults to 'false'
  //serviceName?: string //The serviceName you want to see in Honeycomb. Defaults to 'worker'
}

export default wrapModule(config, worker)
