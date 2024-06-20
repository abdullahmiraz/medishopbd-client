export interface Packaging {
  unitsPerStrip: string;
  stripsPerBox: string;
}

export interface Indications {
  mainTitle: string;
  subtitles: string[];
}

export interface DosageDetail {
  ageRange: string;
  userGroup: string;
  dosageInstructions: string[];
}

export interface UsageDetails {
  indications: Indications;
  dosageDetails: DosageDetail[];
}

export interface ProductData {
  productId: string;
  productName: string;
  measure: string;
  activeIngredient: string;
  dosageForm: string;
  applicationArea: string;
  primaryCategory: string;
  subCategory: string;
  productType: string;
  packaging: Packaging;
  pricePerUnit: string;
  availableStock: string;
  manufacturer: string;
  expirationDate: string;
  batchNumber: string;
  aisleLocation: string;
  requiresPrescription: boolean;
  pageCategory: string;
  productImage: string;
  usageDetails: UsageDetails;
  pharmacology: string;
}
