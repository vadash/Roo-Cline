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
====  SYSTEM INFORMATION
Operating System: ${osName()}
Default Shell: PowerShell
Home Directory: ${os.homedir().toPosix()}
Current Working Directory: ${cwd.toPosix()}
When user initially gives task, recursive list of all filepaths in current working directory ('/test/path') included in environment_details. Provides overview of project file structure, offering key insights from directory/file names (developer organization) and file extensions (languages used). Guides decision-making on which files to explore. Use list_files tool to explore directories outside current working directory. Pass 'true' for recursive parameter to list files recursively, otherwise lists top level, better for generic directories not needing nested structure, like Desktop.
`

	return details
}
