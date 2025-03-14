import { ToolArgs } from "./types"

export function getAccessMcpResourceDescription(args: ToolArgs): string | undefined {
	if (!args.mcpHub) {
		return undefined
	}
	return `
## access_mcp_resource
Description: Request access resource from connected MCP server. Resources are context data sources like files, API responses, system info.
Parameters:
- server_name: (required) MCP server name providing resource
- uri: (required) URI to access resource
Usage:
<access_mcp_resource>
<server_name>server name here</server_name>
<uri>resource URI here</uri>
</access_mcp_resource>
Example: Request access MCP resource
<access_mcp_resource>
<server_name>weather-server</server_name>
<uri>weather://san-francisco/current</uri>
</access_mcp_resource>
`
}
