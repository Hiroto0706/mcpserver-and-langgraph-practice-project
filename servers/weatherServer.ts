import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

// TODO: このコードだと動きません
const server = new McpServer({
  name: "weather-server",
  version: "1.0.0",
});

server.registerTool(
  "get_weather",
  {
    title: "Get Weather Tool",
    description: "Get weather for location",
    inputSchema: { location: z.string() },
  },
  async ({ location }) => ({
    content: [{ type: "text", text: "Hot as hell" }],
  })
);

const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});
await server.connect(transport);
