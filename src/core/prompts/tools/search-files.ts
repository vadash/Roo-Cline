import { ToolArgs } from "./types"

export function getSearchFilesDescription(args: ToolArgs): string {
	return `
search_files Description Request perform regex search across files specified directory providing context-rich results tool searches for patterns specific content across multiple files displaying each match with encapsulating context. Parameters path (required) path directory search (relative current working directory{args.cwd directory recursively searched. regex: (required) regular expression pattern search Uses Rust regex syntax file_pattern: (optional) pattern filter files '*.ts' for TypeScript files). If not provided search all files
Usage:
<search_files>
<path>Directory path here</path>
<regex>Your regex pattern here</regex>
<file_pattern>file pattern here (optional)</file_pattern>
</search_files>
`
}
