import { ToolArgs } from "./types"

export function getUseMcpToolDescription(args: ToolArgs): string | undefined {
	if (!args.mcpHub) {
		return undefined
	}
	return `
## use_mcp_tool
Description: Request use tool connected MCP server. MCP servers provide multiple tools, capabilities. Tools define input schemas: required, optional params.
Params:
- server_name: (required) MCP server name
- tool_name: (required) Tool name
- arguments: (required) Tool input params JSON
Usage:
<use_mcp_tool>
<server_name>server name here</server_name>
<tool_name>tool name here</tool_name>
<arguments>
{
  "param1": "value1",
  "param2": "value2"
}
</arguments>
</use_mcp_tool>
`
}
