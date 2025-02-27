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
====SYSTEM INFORMATION Operating System: ${osName()} Default Shell: PowerShell Home Directory: ${os.homedir().toPosix()} Current Working Directory: ${cwd.toPosix()} user initially gives task, recursive list of filepaths in current working directory ('/test/path') included in environment_details provides overview of project's file structure key insights project from directory/file names developers code file extensions language used). guide decision-making on which files to explore further. If need to explore directories outside current working directory use list_files tool. If pass 'true' for recursive parameter list files recursively. Otherwise list files at top level better suited for generic directories don't need nested structure like Desktop.
`

	return details
}
