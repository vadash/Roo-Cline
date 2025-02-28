export function getSharedToolUseSection(): string {
	return `
====  TOOL USE
Access tools executed upon user approval. Use one tool per message, receive results in user response. Use tools step-by-step, each use informed by previous result.
# Tool Use Formatting
Format tool use with XML-style tags. Tool name enclosed in opening/closing tags, parameters with own tags. Structure:
<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
</tool_name>
Adhere to this format for proper parsing/execution.
`
}
