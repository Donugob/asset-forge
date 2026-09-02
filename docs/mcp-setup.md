# Asset Forge MCP Setup for AI Agents

Asset Forge exposes a native Model Context Protocol (MCP) server that AI Assistants (Cursor, Claude Desktop, Antigravity, etc.) can connect to. 

By connecting your agent to the Asset Forge MCP server, the agent gains a `generate_asset` tool, allowing it to instantly generate dynamic flyers, certificates, and pitch graphics.

## Quick Setup
In your MCP configuration file (e.g. `claude_desktop_config.json` or `.cursor/mcp.json`), add the following server configuration:

```json
{
  "mcpServers": {
    "asset-forge": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/asset-forge/mcp/index.ts"],
      "env": {
        "ASSET_FORGE_API_KEY": "af_your_secret_key_here",
        "ASSET_FORGE_URL": "https://assetforge.votesphere.com.ng"
      }
    }
  }
}
```

## Important AI Caveats

1. **Avatar and Logo Images (SVGs vs PNGs)**
   The image generator (Satori) requires explicit dimensions to render SVGs. If an AI agent passes a remote SVG URL (like standard `placehold.co/...` without an extension) into `avatar_url` or `logo_url`, the generation will crash with: `Image size cannot be determined`.
   **Fix:** Agents MUST use `.png` extensions for placeholder images (e.g., `https://placehold.co/400x400/000000/FFF.png?text=User`) or provide direct links to standard raster images (.jpg, .png).

2. **Template Validation**
   Always check the exact template fields required for the template. Passing extra fields is fine, but omitting fields like `recipient_name` might leave awkward blank spaces on the graphics.

3. **Output format**
   The MCP server writes the generated PDF or PNG directly to the host's temporary folder and returns the absolute path to the AI agent. The AI agent can then parse or attach the file directly to the user's workspace.
