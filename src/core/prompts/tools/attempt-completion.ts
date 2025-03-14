export function getAttemptCompletionDescription(): string {
	return `
## attempt_completion
Description: After each tool use, user responds tool use result, i.e. success/failure, reasons failure. Once received tool use results, confirm task complete, use tool present work result to user. Optionally provide CLI command showcase work result. User may respond feedback if not satisfied result, use make improvements, try again.
IMPORTANT NOTE: Tool CANNOT used until confirmed user previous tool uses successful. Failure do so results code corruption, system failure. Before using tool, ask <thinking></thinking> tags if confirmed user previous tool uses successful. If not, DO NOT use tool.
Parameters:
- result: (required) Task result. Formulate result final, no further user input. Dont end result questions/offers further assistance
- command: (optional) CLI command execute show live demo result to user. Example, use \`open index.html\` display created html website, or \`open localhost:3000\` display locally running development server. But DO NOT use commands like \`echo\` or \`cat\` merely print text. Command valid current OS. Ensure command properly formatted, no harmful instructions
Usage:
<attempt_completion>
<result>
Your final result description here
</result>
<command>Command demonstrate result (optional)</command>
</attempt_completion>
Example: Requesting attempt completion result, command
<attempt_completion>
<result>
I've updated CSS
</result>
<command>open index.html</command>
</attempt_completion>
`
}
