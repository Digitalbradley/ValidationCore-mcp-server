# ValidationCore MCP Server

Enterprise e-commerce validation for Claude Desktop. Transform Claude into your personal product optimization assistant with AI-powered Google Shopping compliance analysis.

## 🚀 Quick Start

### Installation
```bash
npx @validationcore/mcp-server
```

### Claude Desktop Configuration
Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "validationcore": {
      "command": "npx",
      "args": ["@validationcore/mcp-server"],
      "env": {
        "VALIDATIONCORE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Get Your API Key
1. Visit [ValidationCore Dashboard](https://www.validationcore.dev/dashboard)
2. Create an MCP Premium API key
3. Add it to your Claude Desktop configuration

## 🛠️ Available Tools

### Product Validation
```
validate_product(title, price, description?, gtin?, brand?, category?)
```
Comprehensive Google Shopping compliance analysis with revenue impact predictions.

### GTIN Analysis
```
analyze_gtin(gtin)
```
Advanced barcode validation with fraud detection and business impact analysis.

### Batch Processing
```
batch_optimize(products[])
```
AI-powered batch validation and optimization for up to 100 products.

## 💬 Usage Examples

### Basic Product Validation
```
"Validate this product: iPhone 15 Pro, $999, Electronics"
```

### GTIN Verification
```
"Check if this GTIN is valid: 012345678905"
```

### Batch Processing
```
"Process these products for Google Shopping compliance: [product data]"
```

## 💰 Pricing

MCP Server uses ultra-premium pricing:
- **Base rate:** $0.30 per AI request
- **Volume discount:** $0.15 per request (1000+ monthly)
- **Enterprise features:** Advanced analytics included

## 🔧 Development

### Local Development
```bash
git clone https://github.com/Digitalbradley/ValidationCore-mcp-server
cd ValidationCore-mcp-server
npm install
npm run dev
```

### Building
```bash
npm run build
```

### Testing
```bash
VALIDATIONCORE_API_KEY=your_key npm run dev
```

## 📚 Documentation

- [Complete Setup Guide](https://www.validationcore.dev/docs/claude-desktop)
- [API Documentation](https://www.validationcore.dev/docs)
- [Zapier Integration](https://www.validationcore.dev/docs/integrations/zapier/mcp-integration)

## 🐛 Issues & Support

- [GitHub Issues](https://github.com/Digitalbradley/ValidationCore-mcp-server/issues)
- [Documentation](https://www.validationcore.dev/docs/claude-desktop)
- [Community Support](https://www.validationcore.dev/contact-us)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.