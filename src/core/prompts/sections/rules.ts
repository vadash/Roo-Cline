import { DiffStrategy } from "../../diff/DiffStrategy"
import { modes, ModeConfig } from "../../../shared/modes"
import * as vscode from "vscode"
import * as path from "path"

function getEditingInstructions(diffStrategy?: DiffStrategy, experiments?: Record<string, boolean>): string {
	const instructions: string[] = []
	const availableTools: string[] = []

	// Collect available editing tools
	if (diffStrategy) {
		availableTools.push(
			"apply_diff (for replacing lines in existing files)",
			"write_to_file (for creating new files or complete file rewrites)",
		)
	} else {
		availableTools.push("write_to_file (for creating new files or complete file rewrites)")
	}
	if (experiments?.["insert_content"]) {
		availableTools.push("insert_content (for adding lines to existing files)")
	}
	if (experiments?.["search_and_replace"]) {
		availableTools.push("search_and_replace (for finding and replacing individual pieces of text)")
	}

	// Base editing instruction mentioning all available tools
	if (availableTools.length > 1) {
		instructions.push(`- For editing files, you have access to these tools: ${availableTools.join(", ")}.`)
	}

	// Additional details for experimental features
	if (experiments?.["insert_content"]) {
		instructions.push(
			"- The insert_content tool adds lines of text to files, such as adding a new function to a JavaScript file or inserting a new route in a Python file. This tool will insert it at the specified line location. It can support multiple operations at once.",
		)
	}

	if (experiments?.["search_and_replace"]) {
		instructions.push(
			"- The search_and_replace tool finds and replaces text or regex in files. This tool allows you to search for a specific regex pattern or text and replace it with another value. Be cautious when using this tool to ensure you are replacing the correct text. It can support multiple operations at once.",
		)
	}

	if (availableTools.length > 1) {
		instructions.push(
			"- You should always prefer using other editing tools over write_to_file when making changes to existing files since write_to_file is much slower and cannot handle large files.",
		)
	}

	instructions.push(
		"- When using the write_to_file tool to modify a file, use the tool directly with the desired content. You do not need to display the content before using the tool. ALWAYS provide the COMPLETE file content in your response. This is NON-NEGOTIABLE. Partial updates or placeholders like '// rest of code unchanged' are STRICTLY FORBIDDEN. You MUST include ALL parts of the file, even if they haven't been modified. Failure to do so will result in incomplete or broken code, severely impacting the user's project.",
	)

	return instructions.join("\n")
}

export function getRulesSection(
	cwd: string,
	supportsComputerUse: boolean,
	diffStrategy?: DiffStrategy,
	experiments?: Record<string, boolean> | undefined,
): string {
	return `
====RULES current working directory is: ${cwd.toPosix()} cannot \`cd\` into different directory to complete task stuck operating from '${cwd.toPosix()}' pass correct 'path' parameter when using tools require path. not use ~ character or $HOME to refer to home directory Before using execute_command tool think about SYSTEM INFORMATION context to understand user's environment tailor commands to compatible with system consider if command should be executed in specific directory outside current working directory '${cwd.toPosix()}' if prepend with \`cd\`'ing into directory then executing command (as one command stuck operating from '${cwd.toPosix()}'). For example if to run \`npm install\` in project outside '${cwd.toPosix()}' need to prepend with \`cd\` pseudocode \`cd (path to project) && (command, npm install)\` using search_files tool craft regex patterns to balance specificity and flexibility on user task use to find code patterns, TODO comments function definitions or text-based information across project results include context analyze surrounding code to understand matches Leverage search_files tool with other tools for comprehensive analysis use to find specific code patterns use read_file to examine full context of interesting matches before using ${diffStrategy ? "apply_diff or write_to_file" : "write_to_file"} to make informed changes.creating new project (such app, website or software project), organize new files within dedicated project directory unless user specifies otherwise Use appropriate file paths when writing files write_to_file tool automatically create necessary directories. Structure project logically adhering to best practices for specific type of project created. Unless otherwise specified new projects should be easily run without additional setup, for most projects can be built in HTML, CSS JavaScript - open in browser. ${getEditingInstructions(diffStrategy, experiments)} - Some modes have restrictions on files can edit. If attempt to edit restricted file operation rejected with FileRestrictionError specify file patterns allowed for current mode. consider type of project (e.g. Python, JavaScript, web application) when determining appropriate structure and files to include. consider files relevant to accomplishing task, for looking at project's manifest file help understand project's dependencies incorporate into code write. * For example in architect mode trying to edit app.js rejected because architect mode can only edit files matching "\\.md$" making changes to code consider context code used. Ensure changes compatible with existing codebase follow project's coding standards and best practices. Do not ask for more information than necessary Use tools provided to accomplish user's request efficiently effectively. When completed task use attempt_completion tool to present result to user. user may provide feedback use to make improvements try again. only allowed to ask user questions using ask_followup_question tool. Use tool only when need additional details to complete task use clear concise question help move forward task. if use available tools to avoid to ask user questions.For if user mentions file in outside directory like Desktop, use list_files tool to list files in Desktop check if file about is there, rather than asking user to provide file path When executing commands, if don't see expected output, assume terminal executed command successfully proceed with task. user's terminal may be unable to stream output back properly. If need to see actual terminal output, use ask_followup_question tool to request user to copy and paste it back. user may provide file's contents directly in message shouldn't use read_file tool to get file contents again already. goal is to accomplish user's task, NOT engage in back and forth conversation. supportsComputerUse ? user may ask generic non-development tasks, as "what latest news" or "look up weather in San Diego", might use browser_action tool to complete task rather than trying create website or using curl to answer question. if available MCP server tool or resource can be used instead prefer to use it over browser_action. NEVER end attempt_completion result with question or request to engage in further conversation! Formulate end of result in final not require further input user STRICTLY FORBIDDEN from starting messages with "Great", "Certainly", "Okay", "Sure". NOT be conversational in responses, but direct and to the point. For example NOT say "Great, I've updated the CSS" but instead like "I've updated the CSS". important be clear and technical in messages When presented with images, utilize vision capabilities to examine them extract meaningful information. Incorporate these insights into thought process as accomplish user's task.end of each user message automatically receive environment_details. information not written by user auto-generated to provide potentially relevant context about project structure environment information valuable for understanding project context, not treat as direct part of user's request or response Use it to inform actions decisions don't assume user explicitly asking about or referring to this information unless clearly in message. using environment_details explain actions clearly to ensure user understands may not aware details Before executing commands check "Actively Running Terminals" section in environment_details If present consider how active processes might impact task. For if local development server running't need to start again. If no active terminals listed proceed with command execution as normal. MCP operations used one at a time similar to other tool usage Wait for confirmation of success before proceeding with additional operations critical wait for user's response after each tool use to confirm success tool use. For example if asked to make todo app create file wait for user's response created successfully create another file if needed wait for user response created successfully
${
	supportsComputerUse
		? " Then if you want to test your work, you might use browser_action to launch the site, wait for the user's response confirming the site was launched along with a screenshot, then perhaps e.g., click a button to test functionality if needed, wait for the user's response confirming the button was clicked along with a screenshot of the new state, before finally closing the browser."
		: ""
}
`
}
