import { DiffStrategy } from "../../diff/DiffStrategy"
import { McpHub } from "../../../services/mcp/McpHub"

export function getCapabilitiesSection(
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
): string {
	return `
==== CAPABILITIES
- Access tools: execute CLI commands, list files, view code definitions, regex search${
		supportsComputerUse ? ", use browser" : ""
	}, read/write files, ask follow-up questions. Help accomplish tasks: write code, edit/improve files, understand project state, system operations, more
- User task: recursive filepath list in '${cwd}' in environment_details. Overview project file structure, insights from directory/file names (developer code organization) & extensions (language). Guides file exploration. Explore directories outside '${cwd}'? Use list_files tool. 'true' recursive param = recursive list. Else, top level list, better for generic dirs (e.g., Desktop)
- Use search_files for regex searches across files in directory, outputting context-rich results (surrounding lines). Useful for code patterns, implementations, refactoring areas
- Use list_code_definition_names tool for overview of source code definitions (top-level files in directory). Useful for broader context and relationships between code parts. May need multiple calls to understand task-related codebase parts
    - For example: for edits/improvements, analyze file structure (environment_details) for project overview. Use list_code_definition_names for source code definition insight (relevant directories). Then read_file to examine contents, analyze code, suggest/make edits. Use ${diffStrategy ? "apply_diff or write_to_file" : "write_to_file"} to apply changes. Refactor affecting codebase? Use search_files to update other files
- Use execute_command tool to run commands for user task. For CLI command, explain function. Prefer complex CLI commands over scripts - more flexible, easier. Interactive/long-running commands allowed (VSCode terminal). User background commands - status updates provided. Each command in new terminal instance
${
	supportsComputerUse
		? "\n- You can use the browser_action tool to interact with websites (including html files and locally running development servers) through a Puppeteer-controlled browser when you feel it is necessary in accomplishing the user's task. This tool is particularly useful for web development tasks as it allows you to launch a browser, navigate to pages, interact with elements through clicks and keyboard input, and capture the results through screenshots and console logs. This tool may be useful at key stages of web development tasks-such as after implementing new features, making substantial changes, when troubleshooting issues, or to verify the result of your work. You can analyze the provided screenshots to ensure correct rendering or identify errors, and review console logs for runtime issues.\n  - For example, if asked to add a component to a react website, you might create the necessary files, use execute_command to run the site locally, then use browser_action to launch the browser, navigate to the local server, and verify the component renders & functions correctly before closing the browser."
		: ""
}${
		mcpHub
			? `
- You have access to MCP servers that may provide additional tools and resources. Each server may provide different capabilities that you can use to accomplish tasks more effectively.
`
			: ""
	}
`
}
