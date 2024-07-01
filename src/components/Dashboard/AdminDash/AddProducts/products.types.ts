// TypeScript export interfaces for the schema
export interface Packaging {
  unitsPerStrip?: number;
  stripsPerBox?: number;
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

export interface ProductData {
  productId: number; // Change to number
  productName: string;
  measure: string;
  activeIngredient: string;
  dosageForm: string;
  applicationArea: string;
  primaryCategory: string;
  subCategory: string;
  productType: string;
  packaging: { unitsPerStrip: string; stripsPerBox: string };
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
  usageDetails: {
    indications: { mainTitle: string; subtitles: string[] };
    dosageDetails: {
      ageRange: string;
      userGroup: string;
      dosageInstructions: string[];
    }[];
  };
  pharmacology: string;
}
