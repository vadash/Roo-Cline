export function getSwitchModeDescription(): string {
	return `
switch_mode Description Request switch different mode tool allows modes request switching another mode needed switching Code mode make code changes. user must approve mode switch. Parameters: mode_slug: (required) slug of mode switch (e.g. "code", "ask", "architect") reason: (optional) reason for switching modes
Usage:
<switch_mode>
<mode_slug>Mode slug here</mode_slug>
<reason>Reason for switching here</reason>
</switch_mode>
`
}
