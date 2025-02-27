import { ToolArgs } from "./types"

export function getExecuteCommandDescription(args: ToolArgs): string | undefined {
	return `
execute_command Description: Request to execute CLI command on system Use perform system operations or run specific commands accomplish any step in user's task. tailor command to user's system provide clear explanation command. For command chaining use appropriate chaining syntax for user's shell Prefer execute complex CLI commands over creating executable scripts more flexible easier to run. Commands executed in current working directory: ${args.cwd} Parameters: - command: (required) CLI command to execute. valid for current operating system Ensure command properly formatted contain harmful instructions.
Usage:
<execute_command>
<command>Your command here</command>
</execute_command>
`
}
