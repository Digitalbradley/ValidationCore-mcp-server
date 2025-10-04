import axios from 'axios';
// Use production API endpoint
const API_BASE_URL = 'https://www.validationcore.dev';
const API_KEY = process.env.VALIDATIONCORE_API_KEY;
if (!API_KEY) {
    throw new Error('VALIDATIONCORE_API_KEY environment variable is required');
}
// Configure axios instance with defaults
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 second timeout
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ValidationCore-MCP-Server/1.0.0'
    }
});
// Add request interceptor for logging
apiClient.interceptors.request.use((config) => {
    console.error(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});
// Add response interceptor for error handling
apiClient.interceptors.response.use((response) => {
    console.error(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
}, (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.message;
    console.error(`❌ API Error: ${status} ${message}`);
    // Provide helpful error messages
    if (status === 401) {
        throw new Error('Invalid API key. Get a new one at https://www.validationcore.dev/dashboard');
    }
    else if (status === 429) {
        throw new Error('Rate limit exceeded. Please wait before making more requests.');
    }
    else if (status === 402) {
        throw new Error('Usage limit exceeded. Check your billing at https://www.validationcore.dev/dashboard/billing');
    }
    else {
        throw new Error(`API request failed: ${message}`);
    }
});
export async function callValidationAPI(endpoint, data) {
    // Debug logging to see what's actually being sent
    console.error('🔍 Request data:', JSON.stringify(data, null, 2));
    return await apiClient.post(endpoint, data);
}
export async function callGTINAPI(gtin) {
    return await apiClient.post('/api/v2/validate/gtin', {
        gtin
    });
}
export default apiClient;
//# sourceMappingURL=api-client.js.map