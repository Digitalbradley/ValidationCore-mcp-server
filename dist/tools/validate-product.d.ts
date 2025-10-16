interface ProductValidationArgs {
    title: string;
    price: string;
    id?: string;
    description?: string;
    gtin?: string;
    mpn?: string;
    brand?: string;
    category?: string;
    link?: string;
    image_link?: string;
    additional_image_link?: string;
    availability?: string;
    condition?: string;
    shipping_weight?: string;
    google_product_category?: string;
    product_type?: string;
    vehicle_year?: string;
    vehicle_make?: string;
    vehicle_model?: string;
    part_type?: string;
    oem_aftermarket?: string;
    safety_certification?: string;
    warranty?: string;
    gender?: string;
    age_group?: string;
    size?: string;
    size_type?: string;
    size_system?: string;
    color?: string;
    material?: string;
    care_instructions?: string;
    season?: string;
    occasion?: string;
    operating_system?: string;
    active_ingredients?: string;
    material_ingredients?: string;
    safety_warning?: string;
    organic_certification?: string;
    hypoallergenic?: string;
    fragrance_free?: string;
    material_type?: string;
    indoor_outdoor?: string;
    energy_rating?: string;
    weight_capacity?: string;
    assembly_required?: string;
    room_type?: string;
    dimensions?: string;
    style_theme?: string;
    color_family?: string;
    brand_compatibility?: string;
    sport_activity?: string;
    safety_rating?: string;
    equipment_type?: string;
    age_suitability?: string;
    performance_level?: string;
    weather_conditions?: string;
    skill_level?: string;
    team_individual?: string;
    sale_price?: string;
    identifier_exists?: string;
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