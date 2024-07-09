// Define the Category interface

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
  pharmacology?: string; // Added pharmacology field
}

// Define the StockDetail interface
export interface StockDetail {
  batchNumber: string;
  quantity: number;
  expirationDate: string;
  aisleLocation: string;
}

// Define the ProductData interface
export interface ProductData {
  _id: string; // Added _id field
  productId: number;
  productName: string;
  measure: string;
  activeIngredient: string;
  dosageForm: string;
  applicationArea: string;
  primaryCategory: String;
  subCategory: String; // Updated to use SubCategory interface
  productType: string;
  packaging: Packaging;
  pricePerUnit: number;
  stockDetails: StockDetail[]; // Updated to use StockDetail interface
  manufacturer: string;
  requiresPrescription: boolean; // Changed from string to boolean
  pageCategory: string;
  productImage: string;
  leafletImage: string;
  usageDetails: UsageDetails;
}
