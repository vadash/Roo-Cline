import { ToolArgs } from "./types"

export function getBrowserActionDescription(args: ToolArgs): string | undefined {
	if (!args.supportsComputerUse) {
		return undefined
	}
	return `
## browser_action
Description: Interact Puppeteer browser. Each action (except \`close\`) responds with screenshot, console logs. Perform one browser action per message, wait user response (screenshot, logs) for next action.
- Actions **start with** launch browser URL, **end with** close browser. Visit new URL not navigable from current page: close browser, launch new URL.
- Browser active: only \`browser_action\` tool. No other tools during this time. Use other tools after close browser. Error, fix file: close browser, use other tools, re-launch browser to verify.
- Browser window resolution **${args.browserViewportSize}** pixels. Click actions: coordinates within resolution.
- Click elements (icons, links, buttons): consult screenshot, determine element coordinates. Click **center of element**, not edges.
Parameters:
- action: (required) Action to perform. Actions:
    * launch: Launch Puppeteer browser at URL. **First action**.
        - Use \`url\` parameter for URL.
        - URL valid, include protocol (e.g., http://localhost:3000/page, file:///path/to/file.html, etc.).
    * click: Click x,y coordinate.
        - Use \`coordinate\` parameter for location.
        - Click center element (icon, button, link etc.) based on screenshot coordinates.
    * type: Type text. Use after click text field.
        - Use \`text\` parameter for text.
    * scroll_down: Scroll down page height.
    * scroll_up: Scroll up page height.
    * close: Close Puppeteer browser. **Final action**.
        - Example: \`<action>close</action>\`
- url: (optional) URL for \`launch\` action.
    * Example: <url>https://example.com</url>
- coordinate: (optional) X,Y coordinates for \`click\` action. Coordinates within **${args.browserViewportSize}** resolution.
    * Example: <coordinate>450,300</coordinate>
- text: (optional) Text for \`type\` action.
    * Example: <text>Hello, world!</text>
Usage:
<browser_action>
<action>Action (launch, click, type, scroll_down, scroll_up, close)</action>
<url>Launch URL (optional)</url>
<coordinate>x,y coordinates (optional)</coordinate>
<text>Text to type (optional)</text>
</browser_action>
Example: Launch browser at https://example.com
<browser_action>
<action>launch</action>
<url>https://example.com</url>
</browser_action>
Example: Click coordinates 450,300
<browser_action>
<action>click</action>
<coordinate>450,300</coordinate>
</browser_action>
`
}
