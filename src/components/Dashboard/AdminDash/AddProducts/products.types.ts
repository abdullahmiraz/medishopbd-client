export interface Packaging {
  unitsPerStrip?: number; // Changed from string to number
  stripsPerBox?: number; // Changed from string to number
}

export interface DosageDetail {
  ageRange?: string;
  userGroup?: string;
  dosageInstructions?: string[];
}

export interface Indications {
  mainTitle?: string;
  subtitles?: string[];
}

export interface UsageDetails {
  indications?: Indications;
  dosageDetails?: DosageDetail[];
}

// TypeScript export interfaces for the schema

export interface ProductData {
  productId: number; // Changed from string to number
  productName: string;
  measure: string;
  activeIngredient: string;
  dosageForm: string;
  applicationArea: string;
  primaryCategory: string; // Updated to use `Category` interface
  subCategory: string; // Updated to use `SubCategory` interface
  productType: string;
  packaging: Packaging; // Updated to use `Packaging` interface
  pricePerUnit: string;
  availableStock: string;
  manufacturer: string;
  expirationDate: string;
  batchNumber: string;
  aisleLocation: string;
  requiresPrescription: boolean;
  pageCategory: string;
  productImage: string;
  leafletImage: string;
  usageDetails: UsageDetails; // Updated to use `UsageDetails` interface
  pharmacology: string;
}
