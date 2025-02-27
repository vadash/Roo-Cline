export function getSharedToolUseSection(): string {
	return `
====TOOL USE access to set of tools executed upon user's approval. use one tool per message receive result tool in user's response. use tools step-by-step to accomplish given task each tool use informed by result previous tool use. Tool Use Formatting Tool use formatted using XML-style tags tool name enclosed in opening and closing tags each parameter enclosed within own set of tags. structure:
<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</tool_name>
adhere to format for tool use ensure proper parsing execution
`
}
