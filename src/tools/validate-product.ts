import { callValidationAPI } from '../utils/api-client.js';
import { formatValidationForClaude } from '../utils/formatters.js';

interface ProductValidationArgs {
  // Required fields
  title: string;
  price: string;

  // Core optional fields
  id?: string;
  description?: string;
  gtin?: string;
  mpn?: string;
  brand?: string;
  category?: string;

  // Links and media
  link?: string;
  image_link?: string;
  additional_image_link?: string;

  // Inventory
  availability?: string;
  condition?: string;
  shipping_weight?: string;

  // Category classification
  google_product_category?: string;
  product_type?: string;

  // Automotive-specific fields
  vehicle_year?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  part_type?: string;
  oem_aftermarket?: string;
  safety_certification?: string;
  warranty?: string;

  // Apparel-specific fields
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

  // Electronics-specific fields
  operating_system?: string;

  // Health & Beauty-specific fields
  active_ingredients?: string;
  material_ingredients?: string;
  safety_warning?: string;
  organic_certification?: string;
  hypoallergenic?: string;
  fragrance_free?: string;

  // Home & Garden-specific fields
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

  // Sporting Goods-specific fields
  sport_activity?: string;
  safety_rating?: string;
  equipment_type?: string;
  age_suitability?: string;
  performance_level?: string;
  weather_conditions?: string;
  skill_level?: string;
  team_individual?: string;

  // Other optional fields
  sale_price?: string;
  identifier_exists?: string;
}

export async function validateProductTool(args: ProductValidationArgs) {
  try {
    // Validate required fields
    if (!args.title || !args.price) {
      return {
        content: [{
          type: 'text',
          text: '❌ Missing required fields. Product title and price are required for validation.'
        }],
        isError: true
      };
    }

    // Build product object with all provided fields
    const product: any = {
      id: args.id || 'mcp-validation-test',
      title: args.title,
      description: args.description || '',
      price: args.price,
      link: args.link || 'https://www.validationcore.dev/product',
      image_link: args.image_link || 'https://www.validationcore.dev/image.jpg',
      availability: args.availability || 'in_stock',
      condition: args.condition || 'new'
    };

    // Add optional fields if provided
    if (args.gtin) product.gtin = args.gtin;
    if (args.mpn) product.mpn = args.mpn;
    if (args.brand) product.brand = args.brand;
    if (args.category) product.google_product_category = args.category;
    if (args.google_product_category) product.google_product_category = args.google_product_category;
    if (args.product_type) product.product_type = args.product_type;
    if (args.shipping_weight) product.shipping_weight = args.shipping_weight;
    if (args.additional_image_link) product.additional_image_link = args.additional_image_link;
    if (args.sale_price) product.sale_price = args.sale_price;
    if (args.identifier_exists) product.identifier_exists = args.identifier_exists;

    // Automotive fields
    if (args.vehicle_year) product.vehicle_year = args.vehicle_year;
    if (args.vehicle_make) product.vehicle_make = args.vehicle_make;
    if (args.vehicle_model) product.vehicle_model = args.vehicle_model;
    if (args.part_type) product.part_type = args.part_type;
    if (args.oem_aftermarket) product.oem_aftermarket = args.oem_aftermarket;
    if (args.safety_certification) product.safety_certification = args.safety_certification;
    if (args.warranty) product.warranty = args.warranty;

    // Apparel fields
    if (args.gender) product.gender = args.gender;
    if (args.age_group) product.age_group = args.age_group;
    if (args.size) product.size = args.size;
    if (args.size_type) product.size_type = args.size_type;
    if (args.size_system) product.size_system = args.size_system;
    if (args.color) product.color = args.color;
    if (args.material) product.material = args.material;
    if (args.care_instructions) product.care_instructions = args.care_instructions;
    if (args.season) product.season = args.season;
    if (args.occasion) product.occasion = args.occasion;

    // Electronics fields
    if (args.operating_system) product.operating_system = args.operating_system;

    // Health & Beauty fields
    if (args.active_ingredients) product.active_ingredients = args.active_ingredients;
    if (args.material_ingredients) product.material_ingredients = args.material_ingredients;
    if (args.safety_warning) product.safety_warning = args.safety_warning;
    if (args.organic_certification) product.organic_certification = args.organic_certification;
    if (args.hypoallergenic) product.hypoallergenic = args.hypoallergenic;
    if (args.fragrance_free) product.fragrance_free = args.fragrance_free;

    // Home & Garden fields
    if (args.material_type) product.material_type = args.material_type;
    if (args.indoor_outdoor) product.indoor_outdoor = args.indoor_outdoor;
    if (args.energy_rating) product.energy_rating = args.energy_rating;
    if (args.weight_capacity) product.weight_capacity = args.weight_capacity;
    if (args.assembly_required) product.assembly_required = args.assembly_required;
    if (args.room_type) product.room_type = args.room_type;
    if (args.dimensions) product.dimensions = args.dimensions;
    if (args.style_theme) product.style_theme = args.style_theme;
    if (args.color_family) product.color_family = args.color_family;
    if (args.brand_compatibility) product.brand_compatibility = args.brand_compatibility;

    // Sporting Goods fields
    if (args.sport_activity) product.sport_activity = args.sport_activity;
    if (args.safety_rating) product.safety_rating = args.safety_rating;
    if (args.equipment_type) product.equipment_type = args.equipment_type;
    if (args.age_suitability) product.age_suitability = args.age_suitability;
    if (args.performance_level) product.performance_level = args.performance_level;
    if (args.weather_conditions) product.weather_conditions = args.weather_conditions;
    if (args.skill_level) product.skill_level = args.skill_level;
    if (args.team_individual) product.team_individual = args.team_individual;

    // Call ValidationCore API
    const response = await callValidationAPI('/api/v2/validate/product', {
      products: [product]
    });

    const validation = response.data.data?.products?.[0];
    const billing = response.data.data?.billing;

    if (!validation) {
      throw new Error('No validation results returned from API');
    }

    return {
      content: [{
        type: 'text',
        text: formatValidationForClaude(validation, billing)
      }]
    };

  } catch (error: any) {
    console.error('Product validation error:', error);
    
    return {
      content: [{
        type: 'text',
        text: `❌ Product validation failed: ${error.message}\n\n💡 Troubleshooting:\n• Check your API key is valid\n• Ensure you have sufficient API credits\n• Verify your network connection\n\n🔗 Get help: https://github.com/Digitalbradley/ValidationCore-mcp-server/issues`
      }],
      isError: true
    };
  }
}