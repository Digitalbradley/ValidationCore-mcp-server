import { callValidationAPI } from '../utils/api-client.js';
import { formatBatchForClaude } from '../utils/formatters.js';
export async function batchOptimizeTool(args) {
    try {
        // Validate required fields
        if (!args.products || args.products.length === 0) {
            return {
                content: [{
                        type: 'text',
                        text: '❌ At least one product is required for batch processing.'
                    }],
                isError: true
            };
        }
        if (args.products.length > 100) {
            return {
                content: [{
                        type: 'text',
                        text: '❌ Maximum 100 products allowed per batch. Please split into smaller batches.'
                    }],
                isError: true
            };
        }
        // Validate each product has required fields
        for (let i = 0; i < args.products.length; i++) {
            const product = args.products[i];
            if (!product.title || !product.price) {
                return {
                    content: [{
                            type: 'text',
                            text: `❌ Product ${i + 1} is missing required fields (title and price).`
                        }],
                    isError: true
                };
            }
        }
        // Call ValidationCore batch API
        const response = await callValidationAPI('/api/v2/validate/batch', {
            products: args.products.map(product => ({
                title: product.title,
                description: product.description || '',
                price: product.price,
                gtin: product.gtin || '',
                brand: product.brand || '',
                google_product_category: ''
            }))
        });
        const results = response.data.data?.products;
        const billing = response.data.data?.billing;
        if (!results || results.length === 0) {
            throw new Error('No batch processing results returned from API');
        }
        return {
            content: [{
                    type: 'text',
                    text: formatBatchForClaude(results, billing)
                }]
        };
    }
    catch (error) {
        console.error('Batch processing error:', error);
        return {
            content: [{
                    type: 'text',
                    text: `❌ Batch processing failed: ${error.message}\n\n💡 Troubleshooting:\n• Check your API key is valid\n• Ensure all products have title and price\n• Verify your network connection`
                }],
            isError: true
        };
    }
}
//# sourceMappingURL=batch-optimize.js.map