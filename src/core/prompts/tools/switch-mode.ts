export function getSwitchModeDescription(): string {
	return `
## switch_mode
Description: Request mode switch. Tool allows modes request switch mode when needed, e.g. switch Code mode for code changes. User must approve mode switch.
Parameters:
- mode_slug: (required) Mode slug to switch to (e.g., 'code', 'ask', 'architect')
- reason: (optional) Reason for mode switch
Usage:
<switch_mode>
<mode_slug>Mode slug here</mode_slug>
<reason>Reason for switching here</reason>
</switch_mode>
Example: Request switch code mode
<switch_mode>
<mode_slug>code</mode_slug>
<reason>Need to make code changes</reason>
</switch_mode>
`
}
