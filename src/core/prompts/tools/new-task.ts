import { ToolArgs } from "./types"

export function getNewTaskDescription(args: ToolArgs): string {
	return `
## new_task
Description: Create new task with specified starting mode and initial message. Instructs system to create new Cline instance in given mode with provided message.
Parameters:
- mode: (required) Slug of mode to start new task in (e.g., "code", "ask", "architect")
- message: (required) Initial user message or instructions for new task
Usage:
<new_task>
<mode>your-mode-slug-here</mode>
<message>Your initial instructions here</message>
</new_task>
`
}
