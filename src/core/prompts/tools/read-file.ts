import { ToolArgs } from "./types"

export function getReadFileDescription(args: ToolArgs): string {
	return `
## read_file
Description: Request read contents file specified path. Use when need examine contents existing file dont know contents, example analyze code, review text files, extract info config files. Output includes line numbers prefixed each line (e.g. "1 | const x = 1"), making easier reference specific lines when creating diffs or discussing code. Automatically extracts raw text PDF and DOCX files. May not suitable other types binary files, returns raw content as string.
Parameters:
- path: (required) Path file read (relative current working directory ${args.cwd})
Usage:
<read_file>
<path>File path here</path>
</read_file>
Example: Requesting read frontend-config.json
<read_file>
<path>frontend-config.json</path>
</read_file>
`
}
