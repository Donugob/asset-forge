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
        description: "Generate a dynamic graphic asset (image or PDF) using the Asset Forge API. The resulting file is written to your local temp directory and the absolute path is returned.",
        inputSchema: {
          type: "object",
          properties: {
            template_id: { 
              type: "string", 
              description: "The template to use. Available options: 'votesphere_contestant' (Square PNG), 'social_flyer' (Square PNG), 'vertical_pitch' (Square PNG), 'luxury_gold' (PDF), 'corporate_elegant' (PDF), 'geometric_horizon' (PDF)." 
            },
            format: { 
              type: "string", 
              description: "Format to generate ('image' or 'pdf'). Must match the template_id's supported format." 
            },
            data: {
              type: "object",
              description: "Key-value pairs of dynamic data to inject into the template. Common fields include: 'recipient_name', 'title', 'event_name', 'brand_name', 'avatar_url' (MUST be a .png or .jpg, not an SVG without dimensions), 'logo_url', 'description', 'signature_1_name', 'signature_2_name'."
            },
            branding: {
              type: "object",
              description: "Optional branding colors. E.g. { \"primary_color\": \"#2563eb\", \"background_color\": \"#050505\" }"
            }
          },
          required: ["template_id", "format", "data"],
        },
      },
    ],
  };
});

import fs from "fs";
import os from "os";
import path from "path";

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "generate_asset") {
    if (!ASSET_FORGE_API_KEY) {
      return {
        content: [{ type: "text", text: "Error: ASSET_FORGE_API_KEY environment variable is not set. Please set it in your MCP configuration." }],
        isError: true,
      };
    }

    const { template_id, format, data, branding } = request.params.arguments as any;

    try {
      const response = await fetch(`${ASSET_FORGE_URL}/api/v1/generate/${format}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ASSET_FORGE_API_KEY}`
        },
        body: JSON.stringify({ template_id, format, data, branding })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{ type: "text", text: `Asset Forge Generation Failed: ${response.status} ${errorText}` }],
          isError: true,
        };
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const ext = format === 'pdf' ? 'pdf' : 'png';
      const tempFilePath = path.join(os.tmpdir(), `asset-forge-${Date.now()}.${ext}`);
      
      fs.writeFileSync(tempFilePath, buffer);

      return {
        content: [
          {
            type: "text",
            text: `Successfully generated ${format} asset!\nThe file has been saved locally at: ${tempFilePath}`
          }
        ]
      };

    } catch (e: any) {
      return {
        content: [{ type: "text", text: `Error connecting to Asset Forge: ${e.message}` }],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Asset Forge MCP server running on stdio");
}

main().catch(console.error);
