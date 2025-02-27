import { ToolArgs } from "./types"

export function getListCodeDefinitionNamesDescription(args: ToolArgs): string {
	return `
list_code_definition_names Description Request list definition names (classes functions methods in source code files top level specified directory tool provides insights into codebase structure important constructs encapsulating high-level concepts relationships crucial for understanding overall architecture. Parameters: path: (required) path directory (relative current working directory ${args.cwd} list top level source code definitions
Usage:
<list_code_definition_names>
<path>Directory path here</path>
</list_code_definition_names>
`
}
