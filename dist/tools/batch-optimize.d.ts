interface BatchOptimizeArgs {
    products: Array<{
        title: string;
        description?: string;
        price: string;
        gtin?: string;
        brand?: string;
    }>;
}
export declare function batchOptimizeTool(args: BatchOptimizeArgs): Promise<{
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
//# sourceMappingURL=batch-optimize.d.ts.map