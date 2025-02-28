import { ToolArgs } from "./types"

export function getReadFileDescription(args: ToolArgs): string {
	return `
## read_file
Description: Read file contents at specified path. Use to examine unknown file contents, analyze code, review text files, or extract configuration information. Output includes line numbers prefixed to each line for easier reference. Extracts raw text from PDF/DOCX. May not suit other binary files.
Parameters:
- path: (required) File path to read (relative to ${args.cwd})
Usage:
<read_file>
<path>File path here</path>
</read_file>
`
}
