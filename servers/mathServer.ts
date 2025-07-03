import { z } from 'zod'
import { FastMCP } from 'fastmcp'

const server = new FastMCP({
  name: 'math-server',
  version: '1.0.0',
})

server.addTool({
  name: 'add',
  description: 'Add two numbers',
  parameters: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async (args) => {
    return String(args.a + args.b)
  },
})

server.addTool({
  name: 'subtract',
  description: 'Subtract two numbers',
  parameters: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async (args) => {
    return String(args.a - args.b)
  },
})

server.addTool({
  name: 'multiply',
  description: 'Multiply two numbers',
  parameters: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async (args) => {
    return String(args.a * args.b)
  },
})

server.addTool({
  name: 'division',
  description: 'Divide two numbers',
  parameters: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async (args) => {
    return String(args.a / args.b)
  },
})

server.start({
  transportType: 'stdio',
})
