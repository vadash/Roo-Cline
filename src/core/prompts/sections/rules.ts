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
rules:
  environment:
    working_directory: ${cwd.toPosix()}
    restrictions:
      - "Cannot change working directory"
      - "No ~ or $HOME in paths."
  command_execution:
    - "Consider system information before executing commands."
    - "Use 'cd' when targeting directories outside the working directory."
  file_operations:
    - "Use appropriate tools: apply_diff, write_to_file, insert_content, search_and_replace."
    - "Prefer apply_diff and insert_content for modifying existing files."
    - "write_to_file for complete rewrites or new files."
    - "ALWAYS provide COMPLETE file content with write_to_file."
  project_organization:
    - "Create new projects in dedicated directories."
    - "Follow logical project structure and best practices."
  interaction:
    - "Ask clarifying questions only when necessary."
    - "Prefer using tools to gather information."
    - "Use attempt_completion to present final results."
    - "NEVER end attempt_completion with questions or further conversation."
    - "Be direct and technical in communication."
  response:
    - "NEVER start messages with greetings like 'Great', 'Certainly', 'Okay', 'Sure'."
    - "Be direct, not conversational."
    - "Focus on technical information."
  process:
    - "Use environment_details for context, not as a direct request."
    - "Check 'Actively Running Terminals' before executing commands."
    - "Wait for user response after *each* tool use."
${getEditingInstructions(diffStrategy, experiments)}
`
}
