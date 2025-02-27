import { DiffStrategy } from "../../diff/DiffStrategy"
import { McpHub } from "../../../services/mcp/McpHub"

export function getCapabilitiesSection(
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
): string {
	return `
====CAPABILITIES - access to tools execute CLI commands on user's computer list files view source code definitions regex search${supportsComputerUse ? " use browser" : ""} read and write files ask follow-up questions. tools help accomplish tasks writing code making edits improvements to existing files understanding current state project performing system operations more. When user initially gives task, recursive list of all filepaths in current working directory ('${cwd}') included in environment_details. provides overview of project's file structure key insights into project from directory/file names code file extensions language used). guide decision-making on files to explore further. If need to further explore directories outside current working directory use list_files tool. If pass 'true' for recursive parameter it list files recursively. Otherwise list files at top level better suited for generic directories don't need nested structure like Desktop. use search_files to perform regex searches across files in specified directory outputting context-rich results include surrounding lines useful for understanding code patterns finding specific implementations identifying areas need refactoring use list_code_definition_names tool to overview of source code definitions for all files at top level of specified directory. useful when need to understand broader context relationships between certain parts of code. may need to call this tool multiple times to understand various parts of codebase related to task.- For example, when asked to make edits or improvements analyze file structure in initial environment_details overview of project use list_code_definition_names further insight using source code definitions for files in relevant directories then read_file to examine contents of relevant files analyze code suggest improvements or make necessary edits then use ${diffStrategy ? "the apply_diff or write_to_file" : "the write_to_file"} tool to apply changes. If refactored code affect other parts codebase use search_files to update other files needed use execute_command tool to run commands on user's computer help accomplish user's task. When need to execute CLI command provide clear explanation of command. Prefer execute complex CLI commands over creating executable scripts more flexible easier to run. Interactive long-running commands allowed commands run in user's VSCode terminal. user may keep commands running in background kept updated on status. Each command execute run in new terminal instance.
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
