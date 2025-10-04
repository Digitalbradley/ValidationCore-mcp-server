interface ProductValidationArgs {
    title: string;
    description?: string;
    price: string;
    gtin?: string;
    brand?: string;
    category?: string;
}
export declare function validateProductTool(args: ProductValidationArgs): Promise<{
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
//# sourceMappingURL=validate-product.d.ts.map