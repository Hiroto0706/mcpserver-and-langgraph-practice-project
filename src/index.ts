import express from 'express'
import dotenv from 'dotenv'
import { ChatOpenAI } from '@langchain/openai'
import {
  StdioClientTransport,
  type StdioServerParameters,
} from '@modelcontextprotocol/sdk/client/stdio.js'
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { loadMcpTools } from '@langchain/mcp-adapters'

dotenv.config()

const llm = new ChatOpenAI({
  temperature: 1,
})

const stdioServerParams: StdioServerParameters = {
  command: 'node',
  args: [
    '/Users/hirotokadota/Documents/private_study/mcp-servers/mcp-typescript-practice/servers/mathServer.ts',
  ],
}
const transport = new StdioClientTransport(stdioServerParams)
const client = new Client({
  name: 'example-client',
  version: '1.0.0',
})

const app = express()
const port = process.env.PORT

app.get('/', async (req, res) => {
  try {
    await client.connect(transport)
    console.log('session initialized!!!')

    const tools = await loadMcpTools('math-server', client)
    console.log(tools)

    const agent = createReactAgent({
      llm,
      tools,
    })

    const result = await agent.invoke({
      messages: '①(2+4+10+3-10-20)*12/10 と②1+2+3+4+5+6+7+8+9-10は？',
    })
    console.log(result.messages[result.messages.length - 1].content)
    res.send(result.messages[result.messages.length - 1].content)
  } catch (error) {
    console.error('Error: ', error)
    res.send('errored!')
  } finally {
    client.close()
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
