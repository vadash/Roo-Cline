import { ToolArgs } from "./types"

export function getSearchFilesDescription(args: ToolArgs): string {
	return `
## search_files
Description: Regex search files directory, context-rich results. Tool searches patterns/content files, displays matches with context.
Parameters:
- path: (required) Directory path to search (relative cwd ${args.cwd}). Recursively searched
- regex: (required) Regex pattern. Uses Rust regex syntax
- file_pattern: (optional) Glob pattern to filter files (e.g., '*.ts' TypeScript files). If not provided, search all files (*)
Usage:
<search_files>
<path>Directory path here</path>
<regex>Your regex pattern here</regex>
<file_pattern>file pattern here (optional)</file_pattern>
</search_files>
Example: Search all .ts files current directory
<search_files>
<path>.</path>
<regex>.*</regex>
<file_pattern>*.ts</file_pattern>
</search_files>
`
}
