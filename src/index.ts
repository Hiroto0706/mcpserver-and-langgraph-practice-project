import express from 'express'
import dotenv from 'dotenv'
import { ChatOpenAI } from '@langchain/openai'
import {
  StdioClientTransport,
  type StdioServerParameters,
} from '@modelcontextprotocol/sdk/client/stdio.js'

dotenv.config()

const llm = new ChatOpenAI()

const stdioServerParams: StdioServerParameters = {
  command: 'node',
  args: [
    '/Users/hirotokadota/Documents/private_study/mcp-servers/mcp-typescript-practice/servers/mathServer.ts',
  ],
}

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/say_hello', (req, res) => {
  res.send({
    message: 'Hello World!',
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
