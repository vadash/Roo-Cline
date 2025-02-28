import { ToolArgs } from "./types"

export function getSearchFilesDescription(args: ToolArgs): string {
	return `
## search_files
Description: Perform regex search across files in specified directory, providing context-rich results. Searches for patterns/content across multiple files, displaying matches with encapsulating context.
Parameters:
- path: (required) Directory path to search (relative to ${args.cwd}). Searched recursively.
- regex: (required) Regular expression pattern. Uses Rust regex syntax.
- file_pattern: (optional) Glob pattern to filter files. If not provided, searches all files (*).
Usage:
<search_files>
<path>Directory path here</path>
<regex>Your regex pattern here</regex>
<file_pattern>file pattern here (optional)</file_pattern>
</search_files>
`
}
