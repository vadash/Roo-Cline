import defaultShell from "default-shell"
import os from "os"
import osName from "os-name"
import { Mode, ModeConfig, getModeBySlug, defaultModeSlug, isToolAllowedForMode } from "../../../shared/modes"
import { getShell } from "../../../utils/shell"

export function getSystemInfoSection(cwd: string, currentMode: Mode, customModes?: ModeConfig[]): string {
	const findModeBySlug = (slug: string, modes?: ModeConfig[]) => modes?.find((m) => m.slug === slug)

	const currentModeName = findModeBySlug(currentMode, customModes)?.name || currentMode
	const codeModeName = findModeBySlug(defaultModeSlug, customModes)?.name || "Code"

	let details = `
==== SYSTEM INFORMATION
win11 + powershell
Home Directory: ${os.homedir().toPosix()}
Current Working Directory: ${cwd.toPosix()}
`

	return details
}
