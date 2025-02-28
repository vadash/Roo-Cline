import { ToolArgs } from "./types"

export function getListCodeDefinitionNamesDescription(args: ToolArgs): string {
	return `
## list_code_definition_names
Description: List definition names (classes, functions, methods) used in source code files at top level of specified directory. Provides insights into codebase structure and important constructs, encapsulating high-level concepts and relationships crucial for understanding overall architecture.
Parameters:
- path: (required) Directory path (relative to ${args.cwd}) to list top level source code definitions.
Usage:
<list_code_definition_names>
<path>Directory path here</path>
</list_code_definition_names>
Example:
<list_code_definition_names>
<path>.</path>
</list_code_definition_names>
`
}
