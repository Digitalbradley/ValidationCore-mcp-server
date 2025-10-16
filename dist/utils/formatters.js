export function formatValidationForClaude(validation, billing) {
    // NEW: Use AI Agent Context if available (API v2.0.0+)
    const agentContext = validation.agent_context;
    if (agentContext) {
        return formatWithAgentContext(agentContext, validation, billing);
    }
    // FALLBACK: Legacy formatting for older API responses
    return formatLegacy(validation, billing);
}
/**
 * NEW: Format using AI Agent Context (simplified, accurate, complete)
 */
function formatWithAgentContext(agentContext, validation, billing) {
    let result = `## 🤖 AI-Optimized Product Validation\n\n`;
    // Use the API's LLM-optimized summary (already perfect for Claude)
    result += `### 📊 Summary\n${agentContext.llm_summary}\n\n`;
    // Decision flags for immediate action
    if (agentContext.requires_immediate_action) {
        result += `🚨 **IMMEDIATE ACTION REQUIRED**\n`;
        result += `• Revenue at Risk: $${agentContext.total_revenue_at_risk}\n`;
        result += `• Estimated Fix Time: ${agentContext.estimated_fix_time_minutes} minutes\n\n`;
    }
    // Priority Issues (structured data)
    if (agentContext.priority_issues?.length > 0) {
        result += `### ⚠️ Priority Issues\n\n`;
        agentContext.priority_issues.forEach((issue, index) => {
            result += `**${index + 1}. ${issue.field}** (${issue.difficulty})\n`;
            result += `   Problem: ${issue.problem}\n`;
            result += `   Fix: ${issue.fix}\n`;
            result += `   Revenue Impact: $${issue.revenue_impact}\n\n`;
        });
    }
    // Suggested Actions with API endpoints (for automation)
    if (agentContext.suggested_actions?.length > 0) {
        result += `### 🎯 Suggested Actions (Priority Order)\n\n`;
        agentContext.suggested_actions.forEach((action, index) => {
            result += `**${index + 1}. ${action.action_type}** (Priority ${action.priority})\n`;
            result += `   Field: \`${action.field}\`\n`;
            result += `   ${action.description}\n`;
            result += `   Revenue Impact: $${action.revenue_impact} | Difficulty: ${action.difficulty}\n`;
            result += `   ${action.automated ? '✅ Can be automated' : '⚠️ Manual fix required'}\n`;
            result += `   API: \`${action.api_method} ${action.api_endpoint}\`\n\n`;
        });
    }
    // Voice summary for quick overview
    result += `### 💬 Quick Summary\n`;
    result += `"${agentContext.voice_summary}"\n\n`;
    // Billing info
    if (billing) {
        result += `---\n\n### 💳 Billing\n`;
        result += `Cost: $${billing.cost} (MCP Premium)\n`;
        if (billing.pricingTier) {
            result += `Tier: ${billing.pricingTier}\n`;
        }
        result += '\n';
    }
    // Help section
    result += `---\n\n`;
    result += `💡 **Need help?** Ask me to:\n`;
    result += `• "Fix the highest priority issue automatically"\n`;
    result += `• "Explain how to implement these fixes"\n`;
    result += `• "Calculate ROI for fixing all issues"\n`;
    result += `• "Process more products from my CSV"\n\n`;
    result += `📚 [Full Documentation](https://www.validationcore.dev/docs/claude-desktop)`;
    return result;
}
/**
 * FALLBACK: Legacy formatting for backward compatibility
 */
function formatLegacy(validation, billing) {
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
    const hasAgentContext = results[0]?.agent_context;
    // Summary stats
    const compliant = results.filter(r => r.gmcCompliance?.percentage >= 80).length;
    const needsWork = totalProducts - compliant;
    result += `**Summary:**\n`;
    result += `• Total products: ${totalProducts}\n`;
    result += `• Compliant: ${compliant} (${Math.round((compliant / totalProducts) * 100)}%)\n`;
    result += `• Need attention: ${needsWork} (${Math.round((needsWork / totalProducts) * 100)}%)\n\n`;
    // NEW: Use agent_context for accurate revenue and priority data
    if (hasAgentContext) {
        // Total revenue at risk from agent context
        const totalRevenue = results.reduce((sum, r) => sum + (r.agent_context?.total_revenue_at_risk || 0), 0);
        const totalFixTime = results.reduce((sum, r) => sum + (r.agent_context?.estimated_fix_time_minutes || 0), 0);
        const criticalCount = results.filter(r => r.agent_context?.requires_immediate_action).length;
        if (totalRevenue > 0) {
            result += `💰 **Total Revenue at Risk:** $${totalRevenue.toLocaleString()}\n`;
            result += `⏱️ **Total Estimated Fix Time:** ${totalFixTime} minutes\n`;
            if (criticalCount > 0) {
                result += `🚨 **Critical Priority Products:** ${criticalCount}\n`;
            }
            result += '\n';
        }
        // Most common priority issues from agent context
        const allPriorityIssues = results.flatMap(r => r.agent_context?.priority_issues?.map((i) => i.field) || []);
        const issueCounts = allPriorityIssues.reduce((acc, field) => {
            acc[field] = (acc[field] || 0) + 1;
            return acc;
        }, {});
        const topIssues = Object.entries(issueCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        if (topIssues.length > 0) {
            result += `### 🎯 Most Common Issues\n`;
            topIssues.forEach(([field, count], index) => {
                result += `${index + 1}. **${field}** (${count} products affected)\n`;
            });
            result += '\n';
        }
        // Show products requiring immediate action
        const urgentProducts = results.filter(r => r.agent_context?.requires_immediate_action);
        if (urgentProducts.length > 0) {
            result += `### 🚨 Products Requiring Immediate Action\n\n`;
            urgentProducts.slice(0, 5).forEach((p) => {
                result += `**${p.productId}**\n`;
                result += `   ${p.agent_context.voice_summary}\n`;
                result += `   Revenue at Risk: $${p.agent_context.total_revenue_at_risk}\n\n`;
            });
        }
    }
    else {
        // FALLBACK: Legacy revenue calculation
        const totalRevenue = results.reduce((sum, r) => sum + (r.performanceOptimization?.estimatedRevenueImpact || 0), 0);
        if (totalRevenue > 0) {
            result += `💰 **Total Revenue Opportunity:** $${totalRevenue.toLocaleString()}/month\n\n`;
        }
        // Legacy top issues
        const allIssues = results.flatMap(r => r.performanceOptimization?.priorityRecommendations?.slice(0, 3) || []);
        const issueCounts = allIssues.reduce((acc, issue) => {
            acc[issue] = (acc[issue] || 0) + 1;
            return acc;
        }, {});
        const topIssues = Object.entries(issueCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        if (topIssues.length > 0) {
            result += `### 🎯 Most Common Optimization Opportunities\n`;
            topIssues.forEach(([issue, count], index) => {
                result += `${index + 1}. ${issue} (${count} products)\n`;
            });
            result += '\n';
        }
    }
    if (billing) {
        result += `### 💳 Total Cost: $${billing.cost}\n\n`;
    }
    result += `💡 **Next steps:** Ask me to "Show detailed results for the worst performing products" or "Create a fix priority list"\n`;
    return result;
}
//# sourceMappingURL=formatters.js.map