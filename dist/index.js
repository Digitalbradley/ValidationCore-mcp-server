#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { validateProductTool } from './tools/validate-product.js';
import { analyzeGTINTool } from './tools/analyze-gtin.js';
import { batchOptimizeTool } from './tools/batch-optimize.js';
// Verify API key is provided
const API_KEY = process.env.VALIDATIONCORE_API_KEY;
if (!API_KEY) {
    console.error('❌ VALIDATIONCORE_API_KEY environment variable is required');
    console.error('💡 Get your API key at: https://www.validationcore.dev/dashboard');
    process.exit(1);
}
const server = new Server({
    name: 'validationcore-mcp-server',
    version: '1.0.0',
    description: 'ValidationCore MCP Server - Enterprise e-commerce validation and optimization'
}, {
    capabilities: {
        tools: {}
    }
});
// Register available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'validate_product',
                description: 'Validate e-commerce product for Google Shopping compliance with revenue impact analysis',
                inputSchema: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            description: 'Product title (required)'
                        },
                        description: {
                            type: 'string',
                            description: 'Product description'
                        },
                        price: {
                            type: 'string',
                            description: 'Product price (required)'
                        },
                        gtin: {
                            type: 'string',
                            description: 'Product GTIN/UPC/EAN barcode'
                        },
                        brand: {
                            type: 'string',
                            description: 'Product brand name'
                        },
                        category: {
                            type: 'string',
                            description: 'Product category'
                        }
                    },
                    required: ['title', 'price']
                }
            },
            {
                name: 'analyze_gtin',
                description: 'Comprehensive GTIN validation with fraud detection and business impact analysis',
                inputSchema: {
                    type: 'object',
                    properties: {
                        gtin: {
                            type: 'string',
                            description: 'GTIN/UPC/EAN barcode to validate (required)'
                        }
                    },
                    required: ['gtin']
                }
            },
            {
                name: 'batch_optimize',
                description: 'AI-powered batch processing and optimization of multiple products',
                inputSchema: {
                    type: 'object',
                    properties: {
                        products: {
                            type: 'array',
                            description: 'Array of products to validate and optimize',
                            items: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string', description: 'Product title' },
                                    description: { type: 'string', description: 'Product description' },
                                    price: { type: 'string', description: 'Product price' },
                                    gtin: { type: 'string', description: 'Product GTIN' },
                                    brand: { type: 'string', description: 'Product brand' }
                                },
                                required: ['title', 'price']
                            },
                            minItems: 1,
                            maxItems: 100
                        }
                    },
                    required: ['products']
                }
            }
        ]
    };
});
// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case 'validate_product':
                return await validateProductTool(args);
            case 'analyze_gtin':
                return await analyzeGTINTool(args);
            case 'batch_optimize':
                return await batchOptimizeTool(args);
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `❌ Tool execution failed: ${error.message}\n\n💡 Check your API key and network connection.`
                }
            ],
            isError: true
        };
    }
});
// Start MCP server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // Log to stderr (stdout is used for MCP communication)
    console.error('✅ ValidationCore MCP Server ready for Claude Desktop');
    console.error('🔑 Using API key:', API_KEY.substring(0, 12) + '...');
    console.error('📚 Documentation: https://www.validationcore.dev/docs/claude-desktop');
}
main().catch((error) => {
    console.error('❌ Failed to start ValidationCore MCP server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map