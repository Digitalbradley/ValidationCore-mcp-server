interface GTINAnalysisArgs {
    gtin: string;
}
export declare function analyzeGTINTool(args: GTINAnalysisArgs): Promise<{
    content: {
        type: string;
        text: string;
    }[];
    isError: boolean;
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: undefined;
}>;
export {};
//# sourceMappingURL=analyze-gtin.d.ts.map