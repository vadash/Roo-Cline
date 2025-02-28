import { DiffStrategy } from "../../diff/DiffStrategy"
import { McpHub } from "../../../services/mcp/McpHub"

export function getCapabilitiesSection(
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
): string {
	return `
====  CAPABILITIES
- Access tools to execute CLI commands on user computer, list files, view source code definitions, regex search, read/write files, ask follow-up questions. These tools help accomplish tasks like writing code, editing existing files, understanding project state, performing system operations
- When user initially gives task, recursive list of all filepaths in current working directory ('${cwd}') included in environment_details. Provides project file structure overview, offering key insights from directory/file names (developer organization) and file extensions (languages used). Guides decision-making on which files to explore. Use list_files tool to explore directories outside current working directory. Pass 'true' for recursive parameter to list files recursively, otherwise lists top level, better for generic directories not needing nested structure
- Use search_files for regex searches across files in specified directory, outputting context-rich results with surrounding lines. Useful for understanding code patterns, finding specific implementations, identifying refactoring areas. Combine with other tools for comprehensive analysis - find specific code patterns, then use read_file to examine full context before using apply_diff or write_to_file for informed changes
- Use list_code_definition_names for source code definitions overview at top level of specified directory. Useful for understanding broader context and relationships between code parts. May need multiple calls to understand various codebase parts related to task
- For example, when making edits/improvements: analyze file structure in initial environment_details for project overview, use list_code_definition_names for insight using source code definitions in relevant directories, read_file to examine relevant file contents, analyze code and suggest improvements/edits, apply_diff or write_to_file to apply changes. If refactoring affects other codebase parts, use search_files to update other files
- Use execute_command to run commands on user computer when helpful for task. Provide clear explanation of command purpose. Prefer complex CLI commands over executable scripts for flexibility and ease. Interactive and long-running commands allowed, run in user's VSCode terminal. User may keep commands running in background with updates on status. Each command runs in new terminal instance
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
	}`
}
