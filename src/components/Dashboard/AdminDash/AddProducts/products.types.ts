// Define the Category interface
export interface Category {
  name: string;
  description?: string;
  categoryImage?: string;
  categoryCode: string;
}

// Define the SubCategory interface
export interface SubCategory {
  name: string;
  description?: string;
  categoryImage?: string;
  subCategoryCode: string;
}

// Define the Packaging interface
export interface Packaging {
  unitsPerStrip?: number; // Changed from string to number
  stripsPerBox?: number; // Changed from string to number
}

// Define the DosageDetail interface
export interface DosageDetail {
  ageRange?: string;
  userGroup?: string;
  dosageInstructions?: string[];
}

// Define the Indications interface
export interface Indications {
  mainTitle?: string;
  subtitles?: string[];
}

// Define the UsageDetails interface
export interface UsageDetails {
  indications?: Indications;
  dosageDetails?: DosageDetail[];
}

// Define the ProductData interface
export interface ProductData {
  productId: number;
  productName: string;
  measure: string;
  activeIngredient: string;
  dosageForm: string;
  applicationArea: string;
  primaryCategory: {
    id: string;
    name: string;
    description: string;
    categoryImage: string;
    categoryCode: string;
  };
  subCategory: {
    id: string;
    name: string;
    description: string;
    categoryImage: string;
    subCategoryCode: string;
  };
  productType: string;
  packaging: {
    unitsPerStrip: number;
    stripsPerBox: number;
  };
  pricePerUnit: number;
  availableStock: number;
  manufacturer: string;
  expirationDate: string;
  batchNumber: string;
  aisleLocation: string;
  requiresPrescription: boolean;
  pageCategory: string;
  productImage: string;
  leafletImage: string;
  usageDetails: {
    indications: {
      mainTitle: string;
      subtitles: string[];
    };
    dosageDetails: {
      ageRange: string;
      userGroup: string;
      dosageInstructions: string[];
    }[];
  };
  pharmacology: string;
}
