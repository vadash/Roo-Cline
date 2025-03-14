import { ToolArgs } from "./types"

export function getListFilesDescription(args: ToolArgs): string {
	return `
## list_files
Description: Request list files and directories within specified directory. Recursive=true lists all files/directories recursively. Recursive=false/omitted: top-level only. Do not use to confirm file creation; user will confirm success.
Parameters:
- path: (required) Directory path (relative to ${args.cwd})
- recursive: (optional) Recursive listing? true=recursive, false=top-level
Usage:
<list_files>
<path>Directory path here</path>
<recursive>true or false (optional)</recursive>
</list_files>
Example: Requesting to list all files in the current directory
<list_files>
<path>.</path>
<recursive>false</recursive>
</list_files>
`
}
