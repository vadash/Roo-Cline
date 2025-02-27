import { ToolArgs } from "./types"

export function getListFilesDescription(args: ToolArgs): string {
	return `
list_files Description Request to list files directories within specified directory If recursive true list all files directories recursively If recursive false or not only list top-level contents not use tool to confirm existence of files created user know if files created successfully or not. Parameters: path: (required) path directory to list contents (relative to current working directory ${args.cwd} recursive: (optional) list files recursively Use true for recursive listing false or omit for top-level only.
Usage:
<list_files>
<path>Directory path here</path>
<recursive>true or false (optional)</recursive>
</list_files>
`
}
