# ValidationCore MCP Server

[![npm version](https://badge.fury.io/js/@validationcore%2Fmcp-server.svg)](https://www.npmjs.com/package/@validationcore/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Enterprise e-commerce validation for Claude Desktop. Transform Claude into your personal product optimization assistant with AI-powered Google Shopping compliance analysis.

## ✨ Features

### Core Validation Engine
- **🎯 Triple Intelligence Scoring™**: 3 independent validation dimensions
  - **GMC Compliance** (Baseline) - Google Shopping requirements
  - **Category Expertise** (Semantic) - Enterprise-grade cross-field validation
  - **Performance Optimization** (Quality) - Content, pricing, media, category optimization
- **🔍 GTIN Verification**: 18 fraud detection algorithms with 99.7% accuracy
- **📊 Revenue Impact Quantification**: Per-field $ impact analysis ($2,847 avg protection)
- **⚡ Enterprise Scale**: 20,000 products/minute sustained throughput
- **🤖 Natural Language Interface**: Conversational validation through Claude Desktop

### Semantic Validation (Enterprise-Grade)
- **🚗 Automotive**: 521K parts database with 50M fitment records
  - Make-Model compatibility validation (detects "Toyota Camaro" impossibilities)
  - Vehicle fitment validation with compatible vehicle suggestions
- **📱 Electronics**: Brand-OS matrix validation
  - Detects impossible combinations ("Samsung + iOS")
  - 100% accuracy across tested products
- **💄 Health & Beauty**: FDA/FTC age-category compliance
  - Prevents regulatory violations ("infant + anti-aging")
  - 100% accuracy with 0 false positives
- **👕 Apparel**: Gender-size consistency validation
- **🏡 Home & Garden**: Material-environment compatibility checks
- **⚾ Sporting Goods**: Activity-equipment matching logic

### 🤖 AI Agent Integration (v1.1.0+)
MCP server now uses **agent_context** from API v2.0.0 for enhanced Claude Desktop responses:

- **🧠 LLM-Optimized Summaries**: Pre-formatted validation results perfect for Claude consumption
- **🎯 Priority Issues**: Structured data with field names, problems, fixes, revenue impact
- **⚡ Suggested Actions**: Actionable fixes with API endpoints for automation
- **💬 Voice Summaries**: Concise conversational summaries (under 200 chars) for audio interfaces
- **🚨 Decision Flags**: Immediate action indicators, revenue at risk, estimated fix times
- **📊 Batch Intelligence**: Aggregated revenue impact, critical product detection, common issue analysis

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

## 🔧 Troubleshooting

### API Key Issues
- Verify your API key is active at [ValidationCore Dashboard](https://www.validationcore.dev/dashboard)
- Ensure you're using an MCP Premium API key (not a regular API key)
- Check that the key is properly set in your Claude Desktop configuration

### Connection Errors
- Confirm you have an active internet connection
- Verify the ValidationCore API is accessible: `https://www.validationcore.dev`
- Check your account has sufficient credits for MCP usage

### Claude Desktop Not Recognizing Server
- Restart Claude Desktop after adding the configuration
- Verify the JSON configuration is valid (no trailing commas, proper quotes)
- Check Claude Desktop logs for error messages

## 🏢 Enterprise

Looking for enterprise features, custom integrations, or white-label solutions? Contact us at [ValidationCore Enterprise](https://www.validationcore.dev/contact-us)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by [ValidationCore](https://www.validationcore.dev)** | Powered by Claude Desktop & Anthropic MCP