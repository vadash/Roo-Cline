import { ToolArgs } from "./types"

export function getSearchAndReplaceDescription(args: ToolArgs): string {
	return `
## search_and_replace
Description: Search replace file operations. Each operation specify search (string/regex), replace text, optional line range, regex flags. Diff preview before apply
Parameters:
- path: File path (relative cwd ${args.cwd.toPosix()})
- operations: JSON search/replace operations. Each operation:
    * search: Text/pattern
    * replace: Replace text. Multi-line replace, use "\n"
    * start_line: Start line restrict
    * end_line: End line restrict
    * use_regex: Regex search
    * ignore_case: Ignore case
    * regex_flags: Regex flags use_regex
Usage:
<search_and_replace>
<path>File path here</path>
<operations>[
  {
    "search": "text to find",
    "replace": "replacement text",
    "start_line": 1,
    "end_line": 10
  }
]</operations>
</search_and_replace>
Example: Replace "foo" with "bar" in lines 1-10 of example.ts
<search_and_replace>
<path>example.ts</path>
<operations>[
  {
    "search": "foo",
    "replace": "bar",
    "start_line": 1,
    "end_line": 10
  }
]</operations>
</search_and_replace>
Example: Replace all occurrences of "old" with "new" using regex
<search_and_replace>
<path>example.ts</path>
<operations>[
  {
    "search": "old\\w+",
    "replace": "new$&",
    "use_regex": true,
    "ignore_case": true
  }
]</operations>
</search_and_replace>
`
}
