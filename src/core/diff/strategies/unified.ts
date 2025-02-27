import { applyPatch } from "diff"
import { DiffStrategy, DiffResult } from "../types"

export class UnifiedDiffStrategy implements DiffStrategy {
	getToolDescription(args: { cwd: string; toolOptions?: { [key: string]: string } }): string {
		return `
## apply_diff
Description: Apply a unified diff to modify a file.

Parameters:
- path: (required) File path relative to working directory
- diff: (required) Unified diff content to apply

Format Requirements:

1. Header (REQUIRED):
    \`\`\`
   --- path/to/original/file
   +++ path/to/modified/file
    \`\`\`
   - No timestamps after paths

2. Hunks:
    \`\`\`
   @@ -originalStart,originalCount +newStart,newCount @@
   -removed line
   +added line
    \`\`\`
   - Exact indentation required
   - Use - for removed lines
   - Use + for added lines

Example:
Original file:
 \`\`\`
1 | function calculateTotal(items) {
2 |   return items.reduce((sum, item) => sum + item, 0);
3 | }
 \`\`\`

Diff:
 \`\`\`
--- src/utils.js
+++ src/utils.js
@@ -1,3 +1,4 @@
 function calculateTotal(items) {
-  return items.reduce((sum, item) => sum + item, 0);
+  const total = items.reduce((sum, item) => sum + item * 1.1, 0);
+  return Math.round(total * 100) / 100;
 }
 \`\`\`

Tips:
1. Replace complete blocks when possible
2. Ensure correct line numbers
3. Maintain exact indentation
4. Mark all changes with - and +

Usage:
<apply_diff>
<path>src/utils.js</path>
<diff>
--- src/utils.js
+++ src/utils.js
@@ -1,3 +1,4 @@
 function calculateTotal(items) {
-  return items.reduce((sum, item) => sum + item, 0);
+  const total = items.reduce((sum, item) => sum + item * 1.1, 0);
+  return Math.round(total * 100) / 100;
 }
</diff>
</apply_diff>
`
	}

	async applyDiff(originalContent: string, diffContent: string): Promise<DiffResult> {
		try {
			const result = applyPatch(originalContent, diffContent)
			if (result === false) {
				return {
					success: false,
					error: "Failed to apply unified diff - patch rejected",
					details: {
						searchContent: diffContent,
					},
				}
			}
			return {
				success: true,
				content: result,
			}
		} catch (error) {
			return {
				success: false,
				error: `Error applying unified diff: ${error.message}`,
				details: {
					searchContent: diffContent,
				},
			}
		}
	}
}
