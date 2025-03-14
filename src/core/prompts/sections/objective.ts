export function getObjectiveSection(): string {
	return `
objective:
  approach:
    - "Analyze the user task and set clear, achievable goals."
    - "Work through goals sequentially, using one tool at a time."
    - "Use <thinking> tags for analysis before tool selection."
    - "Present results with attempt_completion when the task is complete."
    - "Use feedback to make improvements, if needed."
    - "Avoid unnecessary back-and-forth conversation."
  thinking_process:
    - "Analyze file structure from environment_details."
    - "Identify the most relevant tool for the current step."
    - "Determine if required parameters are available or can be inferred."
    - "Use the tool if all parameters are present/inferable."
    - "Ask for missing parameters using ask_followup_question if necessary."
`
}
