import { ToolArgs } from "./types"

export function getWriteToFileDescription(args: ToolArgs): string {
	return `
write_to_file Description: Request to write full content to file at specified path. If file exists overwritten with provided content. If file doesn't exist, it created tool automatically create directories needed to write file. Parameters: - path: (required) path of file to write to (relative to current working directory ${args.cwd}) - content: (required) content to write to file. provide COMPLETE intended content file without truncation or omissions. MUST include ALL parts of file even if't modified. NOT include line numbers in content just actual content file. line_count: (required) number of lines in file. compute based on actual content file, not number of lines content providing.
Usage:
<write_to_file>
<path>File path here</path>
<content>
Your file content here
</content>
<line_count>total number of lines in the file, including empty lines</line_count>
</write_to_file>
`
}
