import { ToolArgs } from "./types"

export function getNewTaskDescription(args: ToolArgs): string {
	return `
## new_task
Description: Create new task, specify starting mode, initial message. Tool instructs system: create Roo instance, given mode, provided message.
Parameters:
- mode: (required) Mode slug to start task (e.g., "code", "ask", "architect")
- message: (required) Initial user message/instructions for task
Usage:
<new_task>
<mode>your-mode-slug-here</mode>
<message>Your initial instructions here</message>
</new_task>
Example:
<new_task>
<mode>code</mode>
<message>Implement new application feature</message>
</new_task>
`
}
