import { ToolArgs } from "./types"

export function getNewTaskDescription(args: ToolArgs): string {
	return `
new_task Description Create new task with specified starting mode initial message tool instructs system create new Cline instance given mode provided message. Parameters: mode: (required) slug mode start new task (e.g. "code", "ask", "architect"). message: (required) initial user message instructions for new task.
Usage:
<new_task>
<mode>your-mode-slug-here</mode>
<message>Your initial instructions here</message>
</new_task>
`
}
