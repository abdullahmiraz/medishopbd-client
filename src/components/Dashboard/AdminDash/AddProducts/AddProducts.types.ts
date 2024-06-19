interface Packaging {
  unitsPerStrip: string;
  stripsPerBox: string;
}

interface Indications {
  mainTitle: string;
  subtitles: string[];
}

interface DosageDetail {
  ageRange: string;
  userGroup: string;
  dosageInstructions: string[];
}

interface UsageDetails {
  indications: Indications;
  dosageDetails: DosageDetail[];
}

interface ProductData {
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
