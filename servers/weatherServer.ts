import { z } from 'zod'
import { FastMCP } from 'fastmcp'

const server = new FastMCP({
  name: 'weather-server',
  version: '1.0.0',
})

server.addTool({
  name: 'get_weather',
  description: 'Get weather for location',
  parameters: z.object({
    location: z.string(),
  }),
  execute: async (args) => {
    return `Current weather in ${args.location}: Hot as hell`
  },
})

server.start({
  transportType: 'httpStream',
  httpStream: {
    port: 3030,
  },
})

console.log('Weather server listening on port 3030')
