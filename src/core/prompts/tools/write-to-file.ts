import { ToolArgs } from "./types"

export function getWriteToFileDescription(args: ToolArgs): string {
	return `
## write_to_file
Description: Write full content to file at specified path. Overwrites existing files, creates new ones if needed. Creates any needed directories automatically.
Parameters:
- path: (required) File path to write to (relative to ${args.cwd})
- content: (required) Content to write. ALWAYS provide COMPLETE intended content without truncation/omissions. Include ALL parts of file, even unmodified ones. Do NOT include line numbers in content.
- line_count: (required) Number of lines in file. Compute based on actual content.
Usage:
<write_to_file>
<path>File path here</path>
<content>Your file content here</content>
<line_count>total number of lines in file, including empty lines</line_count>
</write_to_file>
`
}
