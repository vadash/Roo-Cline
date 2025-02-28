export function getAttemptCompletionDescription(): string {
	return `
## attempt_completion
Description: After each tool use, user will respond with result (success/failure, reasons for failure). Once you confirm task complete, use this tool to present result to user. Optionally provide CLI command to showcase result. User may respond with feedback for improvements. IMPORTANT: This tool CANNOT be used until confirmed from user that previous tool uses successful. Before using, ask yourself in <thinking></thinking> tags if confirmed from user previous tool uses successful. If not, DO NOT use this tool.
Parameters:
- result: (required) Task result. Formulate in final way not requiring further input. Don't end with questions/offers for assistance.
- command: (optional) CLI command to show live demo of result. For example, \`open index.html\` to display created website, or \`open localhost:3000\` to display local dev server. DO NOT use commands like \`echo\` or \`cat\` that merely print text. Command should be valid for current OS without harmful instructions.
Usage:
<attempt_completion>
<result>Your final result description here</result>
<command>Command to demonstrate result (optional)</command>
</attempt_completion>
`
}
