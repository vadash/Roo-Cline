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
==== RULES
- Current working directory: '${cwd.toPosix()}'
- Cannot \`cd\` into different directory to complete task. Stuck operating from '${cwd.toPosix()}', so pass correct 'path' parameter when using tools requiring path
- Do not use ~ character or $HOME to refer to home directory
- Before using execute_command tool, think about SYSTEM INFORMATION context to understand user environment and tailor compatible commands. Consider if command should run in specific directory outside current working directory, prepend with \`cd\` into that directory && then execute command (as one command since stuck operating from '${cwd.toPosix()}'). For example, to run \`npm install\` in project outside '${cwd.toPosix()}', prepend with \`cd\` i.e. pseudocode would be \`cd (path to project) && (command, in this case npm install)\`
- When using search_files tool, craft regex patterns carefully balancing specificity and flexibility. May use to find code patterns, TODO comments, function definitions, or any text-based information across project. Results include context, so analyze surrounding code to better understand matches. Leverage search_files with other tools for more comprehensive analysis. For example, find specific code patterns, then use read_file to examine full context of interesting matches before using ${diffStrategy ? "apply_diff or write_to_file" : "write_to_file"} for informed changes
- When creating new project (app, website, software), organize all new files within dedicated project directory unless user specifies otherwise. Use appropriate file paths when writing files, as write_to_file tool automatically creates necessary directories. Structure project logically, adhering to best practices for specific project type. Unless specified otherwise, new projects should run without additional setup, for example most projects can build in HTML, CSS, JavaScript - which open in browser
${getEditingInstructions(diffStrategy, experiments)}
- Some modes have restrictions on which files they can edit. Attempting to edit restricted file will be rejected with FileRestrictionError specifying which file patterns allowed for current mode
- Consider project type (Python, JavaScript, web application) when determining appropriate structure and files to include. Consider files most relevant to accomplishing task, for example looking at project's manifest file would help understand project dependencies, which could incorporate into any code written
- When making code changes, consider context in which code used. Ensure changes compatible with existing codebase, follow project's coding standards and best practices
- Do not ask for more information than necessary. Use tools provided to accomplish user request efficiently and effectively. When completed task, must use attempt_completion tool to present result to user. User may provide feedback for improvements
- Only allowed to ask user questions using ask_followup_question tool. Use only when needing additional details to complete task, with clear, concise question to help move forward. If available tools can avoid asking questions, should do so. For example, if user mentions file in outside directory like Desktop, use list_files tool to list Desktop files and check if mentioned file there, rather than asking user to provide file path
- When executing commands, if expected output not seen, assume terminal executed command successfully and proceed. User's terminal may be unable to stream output properly. If absolutely needing actual terminal output, use ask_followup_question tool to request user copy and paste it back
- If user provides file contents directly in message, do not use read_file tool to get contents again since already have it
- Goal is to accomplish user's task, NOT engage in back and forth conversation
- NEVER end attempt_completion result with question or request for further conversation! Formulate end of result in final way not requiring further user input
- STRICTLY FORBIDDEN from starting messages with "Great", "Certainly", "Okay", "Sure". Should NOT be conversational in responses, but direct and to point. For example NOT "Great, I've updated the CSS" but "I've updated the CSS". Be clear and technical in messages
- When presented with images, utilize vision capabilities to thoroughly examine them and extract meaningful information. Incorporate insights into thought process when accomplishing user task
- At end of each user message, automatically receive environment_details. This information not written by user, but auto-generated to provide potentially relevant context about project structure and environment. While valuable for understanding project context, do not treat as direct part of user request or response. Use to inform actions and decisions, but do not assume user explicitly asking about or referring to this information unless clearly doing so in message. When using environment_details, explain actions clearly to ensure user understands, as they may not be aware of these details
- Before executing commands, check "Actively Running Terminals" section in environment_details. If present, consider how active processes might impact task. For example, if local development server already running, would not need to start it again. If no active terminals listed, proceed with command execution normally
- MCP operations should be used one at time, similar to other tool usage. Wait for confirmation of success before proceeding with additional operations
- Critical to wait for user response after each tool use, to confirm success. For example, if asked to make todo app, would create file, wait for user response it was created successfully, then create another file if needed, wait for user response it was created successfully, etc.
${
	supportsComputerUse
		? " Then if you want to test your work, you might use browser_action to launch the site, wait for the user's response confirming the site was launched along with a screenshot, then perhaps e.g., click a button to test functionality if needed, wait for the user's response confirming the button was clicked along with a screenshot of the new state, before finally closing the browser."
		: ""
}`
}
