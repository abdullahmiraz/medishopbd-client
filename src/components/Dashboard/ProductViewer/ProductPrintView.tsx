
"use client";

import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { ProductData } from "../AdminDash/AddProducts/products.types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    backgroundColor: "#ffffff",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Utility function to format nested objects and arrays
const formatValue = (value: any): string => {
  if (Array.isArray(value)) {
    return value.map(formatValue).join(", ");
  } else if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${formatValue(val)}`)
      .join("; ");
  } else {
    return String(value);
  }
};

const ProductPrintView: React.FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem("productDetails");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  return (
    <PDFViewer width="100%" height="600">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              Product Details
            </Text>
            {product ? (
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableCellHeader}>Field</Text>
                  </View>
                  <View style={styles.tableColHeader}>
                    <Text style={styles.tableCellHeader}>Value</Text>
                  </View>
                </View>
                {Object.entries(product).map(([key, value], index) => (
                  <View
                    style={[
                      styles.tableRow,
                      { backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f0f0" },
                    ]}
                    key={key}
                  >
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{key}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{formatValue(value)}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text>Loading product details...</Text>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ProductPrintView;
