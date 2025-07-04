import { ChatOpenAI } from '@langchain/openai'
import dotenv from 'dotenv'
import { MultiServerMCPClient } from '@langchain/mcp-adapters'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { HumanMessage } from '@langchain/core/messages'

dotenv.config()

const llm = new ChatOpenAI({
  temperature: 0,
})

const main = async () => {
  try {
    // Python のコードと同様に 2 つのサーバーを設定
    const client = new MultiServerMCPClient({
      math: {
        command: 'node',
        args: [
          '/Users/hirotokadota/Documents/private_study/mcp-servers/mcp-typescript-practice/servers/mathServer.ts',
        ],
      },
      weather: {
        url: 'http://localhost:3030/mcp',
        transport: 'http',
      },
    })

    // ツールを取得
    const tools = await client.getTools()
    console.log(tools);

    // エージェントを作成
    const agent = createReactAgent({
      llm,
      tools,
    })

    // エージェントを呼び出し
    const result = await agent.invoke({
      messages: [new HumanMessage('What is the weather in San Francisco?')],
    })
    // const result = await agent.invoke({
    //   messages: [new HumanMessage('What is 2 + 2 * 4 - 6 ?')],
    // })

    // 結果を表示
    console.log(result.messages[result.messages.length - 1].content)

    // 接続をクローズ
    await client.close()
  } catch (error) {
    console.error('Error:', error)
  }
}

main().catch(console.error)
