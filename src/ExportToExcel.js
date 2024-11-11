import React from "react";
import * as XLSX from "xlsx";

const ExportToExcelWithTemplate = ({
  shipper,
  consignee,
  notifyParty,
  grossWeight,
  grossWeightUnit,
  portOfLoading,
  placeOfDelivery,
  cbmVolume,
  billOfLadingNo,
  placeAndDateOfIssue,
  containerAndSealNoMatch,
  containerNo,
  sealNo,
  numberOfPackages,
  kindOfPackages,
  portOfDischarge,
  partOfDryContainerSTC,
}) => {
  const handleExport = async () => {
    try {
      // Load the template file
      const response = await fetch('src\static\Book1.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // Access the first worksheet (modify if needed for your file)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Set values in the cells that you need to update
      // Example cell updates (update based on your template's cell references):

      // STT, NO
      // SO HO SO, DOCUMENT NO,
      // NAM DANG KY HO SO, DOCUMENT YEAR
      // CHUC NANG CUA CHUNG TU, DOCUMENT FUNCTION

      worksheet["E4"] = { v: shipper }; // Modify cell A2 for "Shipper"
      worksheet["F4"] = { v: consignee }; // Modify cell B2 for "Consignee"
      worksheet["G4"] = { v: notifyParty }; // Modify cell C2 for "Notify Party"
      // Code of Port of transhipment/transit
      // final destination
      worksheet["J4"] = { v: portOfDischarge };
      worksheet["V4"] = { v: grossWeight };
      worksheet["W4"] = { v: grossWeightUnit };
      worksheet["J4"] = { v: portOfLoading };
      worksheet["M4"] = { v: placeOfDelivery };
      worksheet["E7"] = { v: cbmVolume };
      worksheet["O4"] = { v: billOfLadingNo };
      worksheet["P4"] = { v: placeAndDateOfIssue };

      worksheet["F7"] = { v: containerNo };
      worksheet["G7"] = { v: sealNo };
      worksheet["T4"] = { v: numberOfPackages };
      worksheet["U4"] = { v: kindOfPackages };
      worksheet["L4"] = { v: portOfDischarge };
      worksheet["C7"] = { v: partOfDryContainerSTC };

      // Export the modified workbook
      XLSX.writeFile(workbook, "UpdatedData.xlsx");
      console.log("Excel file exported successfully.");
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  return <button onClick={handleExport}>Export with Template</button>;
};

export default ExportToExcelWithTemplate;
