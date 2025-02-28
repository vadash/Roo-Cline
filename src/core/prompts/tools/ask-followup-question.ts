export function getAskFollowupQuestionDescription(): string {
	return `
## ask_followup_question
Description: Ask user question to gather additional information needed for task. Use when encountering ambiguities, need clarification, or require more details. Enables interactive problem-solving through direct communication. Use judiciously to balance gathering information and avoiding excessive back-and-forth.
Parameters:
- question: (required) Question to ask user. Should be clear, specific question addressing needed information.
Usage:
<ask_followup_question>
<question>Your question here</question>
</ask_followup_question>
`
}
