export function getToolUseGuidelinesSection(): string {
	return `
tool_use_guidelines:
  process:
    - assess_information: "Use <thinking> tags to assess available information and needs"
    - choose_tool: "Select most appropriate tool for current task step."
    - one_tool_per_message: "Use one tool at a time, proceeding iteratively."
    - use_xml_format: "Format tool use with specified XML syntax"
    - wait_for_response: "Wait for user response after each tool use."
    - analyze_response: "Process feedback, errors, outputs before next step."
  importance: "Proceed step-by-step, confirming success of each action before moving forward."
`
}
