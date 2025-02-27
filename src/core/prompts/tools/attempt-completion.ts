export function getAttemptCompletionDescription(): string {
	return `
attempt_completion Description: After each tool use user respond with result, if succeeded or failed reasons for failure. Once you received results confirm task complete, use this tool to present result work to user. Optionally provide CLI command to showcase result work. user may respond with feedback if not satisfied with result use to make improvements try again. IMPORTANT NOTE: tool CANNOT be used until confirmed previous tool uses successful. Failure result in code corruption system failure. Before using tool ask yourself in <thinking></thinking> tags if confirmed previous tool uses successful. If not DO NOT use this tool. Parameters: - result: (required) result of task. Formulate result final not require further input user. Don't end result with questions or offers for further assistance. - command: (optional) CLI command to execute show live demo of result to user. For example use \`open index.html\` to display created html website, or \`open localhost:3000\` to display locally running development server. DO NOT use commands like \`echo\` or \`cat\` that merely print text. command should be valid for current operating system. Ensure command properly formatted not contain harmful instructions.
Usage:
<attempt_completion>
<result>
Your final result description here
</result>
<command>Command to demonstrate result (optional)</command>
</attempt_completion>
`
}
