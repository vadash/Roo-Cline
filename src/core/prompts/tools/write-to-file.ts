import { ToolArgs } from "./types"

export function getWriteToFileDescription(args: ToolArgs): string {
	return `
## write_to_file
Description: Write full file content to path. Overwrite if exists, create if not. Auto-create directories.
Parameters:
- path: (required) File path (relative ${args.cwd})
- content: (required) File content. ALWAYS provide COMPLETE content, all parts, even if unmodified. NO line numbers, just file content.
- line_count: (required) File lines count. Compute from actual content, NOT provided content lines.
Usage:
<write_to_file>
<path>File path here</path>
<content>
Your file content here
</content>
<line_count>total number of lines in the file, including empty lines</line_count>
</write_to_file>
Example: Write frontend-config.json
<write_to_file>
<path>frontend-config.json</path>
<content>
one
two
three
</content>
<line_count>3</line_count>
</write_to_file>
`
}
