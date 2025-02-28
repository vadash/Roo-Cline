import { ToolArgs } from "./types"

export function getListFilesDescription(args: ToolArgs): string {
	return `
## list_files
Description: List files/directories within specified directory. If recursive true, lists all files/directories recursively. If recursive false/not provided, only lists top-level contents. Do not use to confirm existence of created files - user will inform if files created successfully.
Parameters:
- path: (required) Directory path to list contents (relative to ${args.cwd})
- recursive: (optional) Whether to list files recursively. True for recursive listing, false/omit for top-level only.
Usage:
<list_files>
<path>Directory path here</path>
<recursive>true or false (optional)</recursive>
</list_files>
`
}
