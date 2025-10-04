import { callGTINAPI } from '../utils/api-client.js';
import { formatGTINForClaude } from '../utils/formatters.js';
export async function analyzeGTINTool(args) {
    try {
        // Validate required fields
        if (!args.gtin) {
            return {
                content: [{
                        type: 'text',
                        text: '❌ GTIN is required for analysis.'
                    }],
                isError: true
            };
        }
        // Call ValidationCore GTIN API
        const response = await callGTINAPI(args.gtin);
        const analysis = response.data.data?.analysis;
        const billing = response.data.data?.billing;
        if (!analysis) {
            throw new Error('No GTIN analysis results returned from API');
        }
        return {
            content: [{
                    type: 'text',
                    text: formatGTINForClaude(analysis, billing)
                }]
        };
    }
    catch (error) {
        console.error('GTIN analysis error:', error);
        return {
            content: [{
                    type: 'text',
                    text: `❌ GTIN analysis failed: ${error.message}\n\n💡 Troubleshooting:\n• Check your API key is valid\n• Ensure the GTIN format is correct\n• Verify your network connection`
                }],
            isError: true
        };
    }
}
//# sourceMappingURL=analyze-gtin.js.map