export function getSwitchModeDescription(): string {
	return `
## switch_mode
Description: Request to switch to different mode. Allows modes to request switching to another mode when needed, such as switching to Code mode for code changes. User must approve mode switch.
Parameters:
- mode_slug: (required) Slug of mode to switch to (e.g., "code", "ask", "architect")
- reason: (optional) Reason for switching modes
Usage:
<switch_mode>
<mode_slug>Mode slug here</mode_slug>
<reason>Reason for switching here</reason>
</switch_mode>
`
}
