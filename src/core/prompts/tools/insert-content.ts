import { ToolArgs } from "./types"

export function getInsertContentDescription(args: ToolArgs): string {
	return `
## insert_content
Description: Inserts content at line positions in file. Primary tool add new code (functions, methods, classes, imports, attributes) for precise insertions, no overwrite. Efficient line-based system maintains file integrity, correct order. Use proper indentation. Preferred way add code to files.
Parameters:
- path: (required) File path for content insertion (relative to ${args.cwd.toPosix()})
- operations: (required) JSON array of insert operations. Each operation is object:
    * start_line: (required) Line number for insert. Current line content moves below
    * content: (required) Content to insert. NOTE: Single-line: string. Multi-line: string with \n for breaks. Use correct indentation
Usage:
<insert_content>
<path>File path here</path>
<operations>[
  {
    "start_line": 10,
    "content": "Your content here"
  }
]</operations>
</insert_content>
Example: Insert function and import
<insert_content>
<path>File path here</path>
<operations>[
  {
    "start_line": 1,
    "content": "import { sum } from './utils';"
  },
  {
    "start_line": 10,
    "content": "function calculateTotal(items: number[]): number {\n    return items.reduce((sum, item) => sum + item, 0);\n}"
  }
]</operations>
</insert_content>
`
}
