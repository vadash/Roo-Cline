import { ToolArgs } from "./types"

export function getReadFileDescription(args: ToolArgs): string {
	return `
read_file Description Request to read contents file at specified path Use when examine contents existing file analyze code review text files extract information from configuration files. output includes line numbers prefixed to each line (e.g. "1 | const x = 1"), easier to reference specific lines when creating diffs discussing code. extracts raw text from PDF DOCX files not suitable for other binary files returns raw content as string. Parameters: - path: (required) path of file to read (relative to current working directory ${args.cwd})
Usage:
<read_file>
<path>File path here</path>
</read_file>
`
}
