import { ToolArgs } from "./types"

export function getListCodeDefinitionNamesDescription(args: ToolArgs): string {
	return `
## list_code_definition_names
Description: List definition names (classes, functions, methods) source code files top level directory
Tool insights codebase structure, important constructs. Encapsulates high-level concepts, relationships crucial understanding architecture
Parameters:
- path: (required) Directory path (relative ${args.cwd}) list top level code definitions
Usage:
<list_code_definition_names>
<path>Directory path here</path>
</list_code_definition_names>
Example: List top level source code definitions current directory
<list_code_definition_names>
<path>.</path>
</list_code_definition_names>
`
}
