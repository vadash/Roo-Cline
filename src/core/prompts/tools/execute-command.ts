import { ToolArgs } from "./types"

export function getExecuteCommandDescription(args: ToolArgs): string | undefined {
	return `
## execute_command
Description: Request execute CLI command on system. Use when need perform system operations, run commands accomplish user task. Must tailor command user system, provide clear explanation command. Command chaining, use appropriate chaining syntax user shell. Prefer execute complex CLI commands over creating executable scripts, more flexible, easier run. Prefer relative commands, paths avoid location sensitivity terminal consistency, e.g: \`touch ./testdata/example.file\`, \`dir ./examples/model1/data/yaml\`, or \`go test ./cmd/front --config ./cmd/front/config.yml\`. If directed user, may open terminal different directory using \`cwd\` parameter.
Parameters:
- command: (required) CLI command to execute. Valid current OS. Ensure command formatted, no harmful instructions
- cwd: (optional) Working directory execute command (default: ${args.cwd})
Usage:
<execute_command>
<command>Your command here</command>
<cwd>Working directory path (optional)</cwd>
</execute_command>
Example: Requesting execute npm run dev
<execute_command>
<command>npm run dev</command>
</execute_command>
`
}
