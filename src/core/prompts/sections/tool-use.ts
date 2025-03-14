export function getSharedToolUseSection(): string {
	return `
==== TOOL USE
Access set tools executed user approval. Use one tool per message, receive result tool use user response. Use tools step-by-step accomplish given task, each tool use informed result previous tool use.
# Tool Use Formatting
Tool use formatted using XML-style tags. Tool name enclosed opening and closing tags, each parameter similarly enclosed within tags. Structure:
<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</tool_name>
Example:
<read_file>
<path>src/main.js</path>
</read_file>
Adhere format tool use ensure proper parsing and execution.
`
}
