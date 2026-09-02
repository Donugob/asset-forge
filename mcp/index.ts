#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "asset-forge-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// We need an API key to communicate with our Asset Forge instance.
// Assuming it's passed via env var
const ASSET_FORGE_API_KEY = process.env.ASSET_FORGE_API_KEY;
const ASSET_FORGE_URL = process.env.ASSET_FORGE_URL || "http://localhost:3000";

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_asset",
        description: "Generate a graphic asset (image or PDF) using Asset Forge.",
        inputSchema: {
          type: "object",
          properties: {
            template_id: { type: "string", description: "Template ID (e.g. votesphere_contestant, social_flyer)" },
            format: { type: "string", description: "Format (image or pdf)" },
            data: {
              type: "object",
              description: "Template specific data (e.g. recipient_name, avatar_url, etc.)"
            },
            branding: {
              type: "object",
              description: "Optional branding colors: primary_color, background_color"
            }
          },
          required: ["template_id", "format", "data"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_asset") {
    if (!ASSET_FORGE_API_KEY) {
      return {
        content: [{ type: "text", text: "Error: ASSET_FORGE_API_KEY environment variable is not set." }],
        isError: true,
      };
    }

    const { template_id, format, data, branding } = request.params.arguments as any;

    try {
      const response = await fetch(\`\${ASSET_FORGE_URL}/api/v1/generate/\${format}\`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": \`Bearer \${ASSET_FORGE_API_KEY}\`
        },
        body: JSON.stringify({ template_id, format, data, branding })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{ type: "text", text: \`Generation failed: \${response.status} \${errorText}\` }],
          isError: true,
        };
      }

      // Read binary data and encode as base64
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const mimeType = format === 'pdf' ? 'application/pdf' : 'image/png';

      return {
        content: [
          {
            type: "text",
            text: \`Successfully generated \${format}.\`
          },
          // MCP currently doesn't directly display raw binary in some clients, but we can return the base64 URL or a local path.
          // For simplicity, we just return the text saying it worked, or we could write it to a temp file and return the path.
          {
            type: "text",
            text: \`Base64 encoded (first 100 chars): data:\${mimeType};base64,\${base64.substring(0, 100)}...\`
          }
        ]
      };

    } catch (e: any) {
      return {
        content: [{ type: "text", text: \`Error: \${e.message}\` }],
        isError: true,
      };
    }
  }

  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Asset Forge MCP server running on stdio");
}

main().catch(console.error);
