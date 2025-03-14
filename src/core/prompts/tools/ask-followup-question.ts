export function getAskFollowupQuestionDescription(): string {
	return `
## ask_followup_question
Description: Ask user question gather info complete task. Tool use encounter ambiguities, need clarification, require details proceed effectively. Allows interactive problem-solving enabling direct communication user. Use tool judiciously maintain balance gathering necessary info avoiding excessive back-forth
Parameters:
- question: (required) Question ask user. Clear, specific question addresses info need
Usage:
<ask_followup_question>
<question>Your question here</question>
</ask_followup_question>
Example: Requesting ask user path frontend-config.json file
<ask_followup_question>
<question>What is the path to the frontend-config.json file?</question>
</ask_followup_question>
`
}
