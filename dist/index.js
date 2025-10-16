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
                description: 'Validate e-commerce product for Google Shopping compliance with Triple Intelligence scoring (GMC Compliance + Category Expertise + Performance Optimization). Includes semantic validation for automotive (make-model compatibility), electronics (brand-OS compatibility), health & beauty (age-category restrictions), apparel, home & garden, and sporting goods.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        // Required fields
                        title: { type: 'string', description: 'Product title (required)' },
                        price: { type: 'string', description: 'Product price with currency (required, e.g., "99.99 USD")' },
                        // Core optional fields
                        id: { type: 'string', description: 'Product ID/SKU' },
                        description: { type: 'string', description: 'Product description (90+ characters recommended)' },
                        gtin: { type: 'string', description: 'GTIN/UPC/EAN barcode' },
                        mpn: { type: 'string', description: 'Manufacturer Part Number' },
                        brand: { type: 'string', description: 'Product brand name' },
                        category: { type: 'string', description: 'Product category shorthand (use google_product_category for full path)' },
                        // Links and media
                        link: { type: 'string', description: 'Product URL' },
                        image_link: { type: 'string', description: 'Main product image URL' },
                        additional_image_link: { type: 'string', description: 'Additional product image URL' },
                        // Inventory
                        availability: { type: 'string', description: 'Product availability (in_stock, out_of_stock, preorder, backorder)' },
                        condition: { type: 'string', description: 'Product condition (new, refurbished, used)' },
                        shipping_weight: { type: 'string', description: 'Shipping weight with unit (e.g., "4.5 lb")' },
                        // Category classification
                        google_product_category: { type: 'string', description: 'Full Google product category path' },
                        product_type: { type: 'string', description: 'Product type for categorization' },
                        // Automotive-specific fields (triggers 521K parts database validation)
                        vehicle_year: { type: 'string', description: 'Vehicle year (e.g., "2020")' },
                        vehicle_make: { type: 'string', description: 'Vehicle manufacturer (e.g., "Toyota", "Ford")' },
                        vehicle_model: { type: 'string', description: 'Vehicle model (e.g., "Camry", "F-150")' },
                        part_type: { type: 'string', description: 'Automotive part type (Engine, Transmission, Brake System, etc.)' },
                        oem_aftermarket: { type: 'string', description: 'OEM or Aftermarket classification' },
                        safety_certification: { type: 'string', description: 'Safety certification (DOT, SAE, FMVSS, ECE, JIS)' },
                        warranty: { type: 'string', description: 'Warranty information' },
                        // Apparel-specific fields (triggers gender-size validation)
                        gender: { type: 'string', description: 'Target gender (male, female, unisex)' },
                        age_group: { type: 'string', description: 'Target age group (infant, child, teen, adult, all_ages)' },
                        size: { type: 'string', description: 'Size (XS, S, M, L, XL, XXL, etc.)' },
                        size_type: { type: 'string', description: 'Size type (regular, petite, plus, tall, maternity)' },
                        size_system: { type: 'string', description: 'Size system (US, UK, EU, etc.)' },
                        color: { type: 'string', description: 'Product color' },
                        material: { type: 'string', description: 'Material composition' },
                        care_instructions: { type: 'string', description: 'Care instructions (wash, dry clean, etc.)' },
                        season: { type: 'string', description: 'Season (spring, summer, fall, winter, all-season)' },
                        occasion: { type: 'string', description: 'Occasion (casual, formal, athletic, etc.)' },
                        // Electronics-specific fields (triggers brand-OS validation)
                        operating_system: { type: 'string', description: 'Operating system (iOS, Android, Windows, macOS, Chrome OS, etc.)' },
                        // Health & Beauty-specific fields (triggers age-category restrictions)
                        active_ingredients: { type: 'string', description: 'Active ingredients list' },
                        material_ingredients: { type: 'string', description: 'Material/cosmetic ingredients' },
                        safety_warning: { type: 'string', description: 'Safety warnings or precautions' },
                        organic_certification: { type: 'string', description: 'Organic certification (USDA Organic, etc.)' },
                        hypoallergenic: { type: 'string', description: 'Hypoallergenic designation (true/false)' },
                        fragrance_free: { type: 'string', description: 'Fragrance-free designation (true/false)' },
                        // Home & Garden-specific fields (triggers material-environment compatibility)
                        material_type: { type: 'string', description: 'Material type (wood, metal, plastic, fabric, wicker, etc.)' },
                        indoor_outdoor: { type: 'string', description: 'Indoor or outdoor use (indoor, outdoor, both)' },
                        energy_rating: { type: 'string', description: 'Energy efficiency rating' },
                        weight_capacity: { type: 'string', description: 'Weight capacity with unit' },
                        assembly_required: { type: 'string', description: 'Assembly required (true/false/partial)' },
                        room_type: { type: 'string', description: 'Target room (bedroom, living room, kitchen, etc.)' },
                        dimensions: { type: 'string', description: 'Product dimensions (LxWxH)' },
                        style_theme: { type: 'string', description: 'Style theme (modern, rustic, traditional, etc.)' },
                        color_family: { type: 'string', description: 'Color family (neutral, warm, cool, etc.)' },
                        brand_compatibility: { type: 'string', description: 'Compatible brands' },
                        // Sporting Goods-specific fields (triggers activity-equipment matching)
                        sport_activity: { type: 'string', description: 'Sport/activity type (basketball, tennis, soccer, etc.)' },
                        safety_rating: { type: 'string', description: 'Safety rating or certification' },
                        equipment_type: { type: 'string', description: 'Equipment type (ball, racket, protective gear, etc.)' },
                        age_suitability: { type: 'string', description: 'Age suitability (youth, adult, all-ages)' },
                        performance_level: { type: 'string', description: 'Performance level (beginner, intermediate, advanced, professional)' },
                        weather_conditions: { type: 'string', description: 'Suitable weather conditions (indoor, outdoor, all-weather)' },
                        skill_level: { type: 'string', description: 'Required skill level (beginner, intermediate, advanced)' },
                        team_individual: { type: 'string', description: 'Team or individual sport (team, individual, both)' },
                        // Other optional fields
                        sale_price: { type: 'string', description: 'Sale price with currency' },
                        identifier_exists: { type: 'string', description: 'Whether identifier (GTIN/MPN) exists (true/false)' }
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