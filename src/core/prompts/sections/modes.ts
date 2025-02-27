import * as path from "path"
import * as vscode from "vscode"
import { promises as fs } from "fs"
import { ModeConfig, getAllModesWithPrompts } from "../../../shared/modes"

export async function getModesSection(context: vscode.ExtensionContext): Promise<string> {
	const settingsDir = path.join(context.globalStorageUri.fsPath, "settings")
	await fs.mkdir(settingsDir, { recursive: true })
	const customModesPath = path.join(settingsDir, "cline_custom_modes.json")

	// Get all modes with their overrides from extension state
	const allModes = await getAllModesWithPrompts(context)

	return `
====MODES available modes: ${allModes.map((mode: ModeConfig) => `  * "${mode.name}" mode (${mode.slug}) - ${mode.roleDefinition.split(".")[0]}`).join("\n")} Custom modes configured via '.roomodes' in workspace root directory fields required not empty: * slug: valid slug (lowercase letters, numbers hyphens). unique shorter better. name: display name for mode roleDefinition: detailed description of mode's role capabilities groups: Array of allowed tool groups (can empty). Each group specified as string (e "edit" allow editing any file) or with file restrictions ["edit", fileRegex: "\\.md$", description: "Markdown files only" } allow editing markdown files) customInstructions field optional For multi-line text include newline characters in string like "This first line next line double line break."
`
}
