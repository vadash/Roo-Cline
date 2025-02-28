import { ToolArgs } from "./types"

export function getExecuteCommandDescription(args: ToolArgs): string | undefined {
	return `
## execute_command
Description: Request CLI command execution on system. Use for system operations or specific commands. Tailor command to user system, provide clear explanation. For command chaining, use appropriate syntax. Prefer complex CLI commands over executable scripts. Commands executed in current directory: ${args.cwd}
Parameters:
- command: (required) CLI command to execute. Must be valid for current OS without harmful instructions.
Usage:
<execute_command>
<command>Your command here</command>
</execute_command>
`
}
