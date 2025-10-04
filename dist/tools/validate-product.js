import { callValidationAPI } from '../utils/api-client.js';
import { formatValidationForClaude } from '../utils/formatters.js';
export async function validateProductTool(args) {
    try {
        // Validate required fields
        if (!args.title || !args.price) {
            return {
                content: [{
                        type: 'text',
                        text: '❌ Missing required fields. Product title and price are required for validation.'
                    }],
                isError: true
            };
        }
        // Call ValidationCore API
        const response = await callValidationAPI('/api/v2/validate/product', {
            products: [{
                    title: args.title,
                    description: args.description || '',
                    price: args.price,
                    gtin: args.gtin || '',
                    brand: args.brand || '',
                    google_product_category: args.category || ''
                }]
        });
        const validation = response.data.data?.products?.[0];
        const billing = response.data.data?.billing;
        if (!validation) {
            throw new Error('No validation results returned from API');
        }
        return {
            content: [{
                    type: 'text',
                    text: formatValidationForClaude(validation, billing)
                }]
        };
    }
    catch (error) {
        console.error('Product validation error:', error);
        return {
            content: [{
                    type: 'text',
                    text: `❌ Product validation failed: ${error.message}\n\n💡 Troubleshooting:\n• Check your API key is valid\n• Ensure you have sufficient API credits\n• Verify your network connection\n\n🔗 Get help: https://github.com/Digitalbradley/ValidationCore-mcp-server/issues`
                }],
            isError: true
        };
    }
}
//# sourceMappingURL=validate-product.js.map