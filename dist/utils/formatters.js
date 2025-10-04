export function formatValidationForClaude(validation, billing) {
    const { gmcCompliance, performanceOptimization, identity } = validation;
    let result = `## 📊 Product Validation Results\n\n`;
    // Overall status
    const overallStatus = gmcCompliance.percentage >= 80 ? '✅ COMPLIANT' : '⚠️ NEEDS ATTENTION';
    result += `**Status:** ${overallStatus}\n\n`;
    // GMC Compliance
    result += `### 🎯 Google Shopping Compliance: ${gmcCompliance.percentage}%\n\n`;
    if (gmcCompliance.violations?.length > 0) {
        result += `**Issues Found:**\n`;
        gmcCompliance.violations.forEach((violation, index) => {
            result += `${index + 1}. ${violation}\n`;
        });
        result += '\n';
    }
    else {
        result += `✅ Fully compliant with Google Shopping requirements\n\n`;
    }
    // Performance Score
    result += `### ⚡ Performance Score: ${performanceOptimization.overallScore}%\n\n`;
    // Revenue Impact
    if (performanceOptimization.estimatedRevenueImpact) {
        result += `### 💰 Revenue Impact: $${performanceOptimization.estimatedRevenueImpact}/month\n\n`;
        if (performanceOptimization.estimatedRevenueImpact > 100) {
            result += `🚀 **High Impact Opportunity!** Fixing these issues could significantly boost your revenue.\n\n`;
        }
    }
    // Priority Recommendations
    if (performanceOptimization.priorityRecommendations?.length > 0) {
        result += `### 🎯 Top Priority Fixes:\n\n`;
        performanceOptimization.priorityRecommendations.slice(0, 5).forEach((rec, index) => {
            result += `${index + 1}. ${rec}\n`;
        });
        result += '\n';
    }
    // GTIN Status
    if (identity?.gtin) {
        const gtinStatus = identity.gtin.isValid ? '✅ Valid' : '❌ Invalid';
        result += `### 🏷️ GTIN Status: ${gtinStatus}\n`;
        if (!identity.gtin.isValid && identity.gtin.message) {
            result += `${identity.gtin.message}\n`;
        }
        result += '\n';
    }
    // Billing info
    if (billing) {
        result += `### 💳 Billing\n`;
        result += `Cost: $${billing.cost} (MCP Premium)\n`;
        if (billing.pricingTier) {
            result += `Tier: ${billing.pricingTier}\n`;
        }
        result += '\n';
    }
    // Help section
    result += `---\n\n`;
    result += `💡 **Need help?** Ask me to:\n`;
    result += `• "Optimize this product description"\n`;
    result += `• "Explain how to fix these issues"\n`;
    result += `• "Calculate ROI for fixing these problems"\n`;
    result += `• "Process more products from my CSV"\n\n`;
    result += `📚 [Full Documentation](https://www.validationcore.dev/docs/claude-desktop)`;
    return result;
}
export function formatGTINForClaude(analysis, billing) {
    let result = `## 🏷️ GTIN Analysis Results\n\n`;
    result += `**GTIN:** \`${analysis.gtin}\`\n`;
    result += `**Status:** ${analysis.isValid ? '✅ Valid' : '❌ Invalid'}\n\n`;
    if (analysis.validationDetails) {
        result += `### 📋 Details\n`;
        result += `• **Format:** ${analysis.validationDetails.format}\n`;
        result += `• **Length:** ${analysis.validationDetails.length} digits\n`;
        result += `• **Check Digit:** ${analysis.validationDetails.checkDigit ? '✅ Valid' : '❌ Invalid'}\n\n`;
    }
    if (!analysis.isValid && analysis.errors?.length > 0) {
        result += `### ⚠️ Issues Found\n`;
        analysis.errors.forEach((error, index) => {
            result += `${index + 1}. ${error}\n`;
        });
        result += '\n';
    }
    if (analysis.businessImpact) {
        result += `### 💼 Business Impact\n`;
        result += `${analysis.businessImpact.description}\n`;
        if (analysis.businessImpact.estimatedLoss) {
            result += `\n📉 **Potential Revenue Loss:** $${analysis.businessImpact.estimatedLoss}/month\n`;
        }
        result += '\n';
    }
    // Recommendations
    if (!analysis.isValid) {
        result += `### 🎯 Recommendations\n`;
        result += `1. Obtain a valid GTIN from GS1 or your supplier\n`;
        result += `2. Verify the check digit calculation\n`;
        result += `3. Ensure the GTIN format matches your product type\n\n`;
    }
    if (billing) {
        result += `### 💳 Billing: $${billing.cost}\n\n`;
    }
    return result;
}
export function formatBatchForClaude(results, billing) {
    let result = `## 📊 Batch Processing Results\n\n`;
    const totalProducts = results.length;
    const compliant = results.filter(r => r.gmcCompliance?.percentage >= 80).length;
    const needsWork = totalProducts - compliant;
    result += `**Summary:**\n`;
    result += `• Total products: ${totalProducts}\n`;
    result += `• Compliant: ${compliant} (${Math.round((compliant / totalProducts) * 100)}%)\n`;
    result += `• Need attention: ${needsWork} (${Math.round((needsWork / totalProducts) * 100)}%)\n\n`;
    // Revenue impact summary
    const totalRevenue = results.reduce((sum, r) => sum + (r.performanceOptimization?.estimatedRevenueImpact || 0), 0);
    if (totalRevenue > 0) {
        result += `💰 **Total Revenue Opportunity:** $${totalRevenue.toLocaleString()}/month\n\n`;
    }
    // Top issues
    const allIssues = results.flatMap(r => r.gmcCompliance?.violations || []);
    const issueCounts = allIssues.reduce((acc, issue) => {
        acc[issue] = (acc[issue] || 0) + 1;
        return acc;
    }, {});
    const topIssues = Object.entries(issueCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    if (topIssues.length > 0) {
        result += `### 🎯 Most Common Issues\n`;
        topIssues.forEach(([issue, count], index) => {
            result += `${index + 1}. ${issue} (${count} products)\n`;
        });
        result += '\n';
    }
    if (billing) {
        result += `### 💳 Total Cost: $${billing.cost}\n\n`;
    }
    result += `💡 **Next steps:** Ask me to "Show detailed results for the worst performing products" or "Create a fix priority list"\n`;
    return result;
}
//# sourceMappingURL=formatters.js.map