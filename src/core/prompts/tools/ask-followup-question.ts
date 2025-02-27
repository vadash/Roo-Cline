export function getAskFollowupQuestionDescription(): string {
	return `
ask_followup_question Description: Ask user question to gather additional information complete task tool used when encounter ambiguities need clarification require more details proceed. allows interactive problem-solving enabling direct communication with user. Use tool judiciously maintain balance between gathering necessary information avoiding excessive back-and-forth. Parameters: - question: (required) question to ask user. clear, specific question addresses information need.
Usage:
<ask_followup_question>
<question>Your question here</question>
</ask_followup_question>
`
}
