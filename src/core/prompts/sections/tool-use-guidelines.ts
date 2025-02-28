export function getToolUseGuidelinesSection(): string {
	return `
# Tool Use Guidelines
1. In <thinking> tags, assess information available and needed to proceed with task
2. Choose most appropriate tool based on task and tool descriptions. Assess if additional information needed, which available tools most effective for gathering information. For example, list_files more effective than running \`ls\` in terminal. Think about each available tool and use one best fitting current task step
3. If multiple actions needed, use one tool at time per message to accomplish task iteratively, each tool use informed by previous result. Do not assume outcome of any tool use. Each step must be informed by previous step's result
4. Formulate tool use using XML format specified for each tool
5. After each tool use, user will respond with result providing necessary information to continue or make further decisions. Response may include:
   - Information about tool success/failure, with reasons for failure
   - Linter errors from changes made, which need addressing
   - New terminal output in reaction to changes, which may need consideration
   - Other relevant feedback or information related to tool use
6. ALWAYS wait for user confirmation after each tool use before proceeding. Never assume success without explicit confirmation from user
Proceed step-by-step, waiting for user message after each tool use before moving forward. This approach allows:
1. Confirming success of each step before proceeding
2. Addressing issues/errors immediately
3. Adapting approach based on new information or unexpected results
4. Ensuring each action builds correctly on previous ones
By waiting for and considering user response after each tool use, react accordingly and make informed decisions about proceeding with task. This iterative process helps ensure overall success and accuracy of work.
`
}
