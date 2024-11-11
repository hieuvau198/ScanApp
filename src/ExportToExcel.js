import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExportToExcel = ({
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
  containerNo,
  sealNo,
  numberOfPackages,
  kindOfPackages,
  portOfDischarge,
  partOfDryContainerSTC,
}) => {
  const handleExport = async () => {
    try {
      // Load the workbook
      const response = await fetch("/assets/template2.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.getWorksheet(1); // Access the first sheet

      portOfDischarge = transformPort(portOfDischarge);
      portOfLoading = transformPort(portOfLoading);

      // Apply data to specific cells
      worksheet.getCell("E4").value = shipper;
      worksheet.getCell("F4").value = consignee;
      worksheet.getCell("G4").value = notifyParty;
      worksheet.getCell("J4").value = portOfDischarge;  // final destination
      worksheet.getCell("K4").value = portOfLoading;    
      worksheet.getCell("L4").value = portOfDischarge;
      worksheet.getCell("M4").value = placeOfDelivery;
      worksheet.getCell("O4").value = billOfLadingNo;
      worksheet.getCell("P4").value = placeAndDateOfIssue;  //Date of house bill of lading
      worksheet.getCell("T4").value = numberOfPackages;
      worksheet.getCell("U4").value = kindOfPackages;
      worksheet.getCell("V4").value = grossWeight;
      worksheet.getCell("W4").value = grossWeightUnit;
      worksheet.getCell("C7").value = partOfDryContainerSTC;
      worksheet.getCell("E7").value = cbmVolume;
      worksheet.getCell("F7").value = containerNo;
      worksheet.getCell("G7").value = sealNo;
      
      
      worksheet.getCell("L4").value = portOfDischarge;
      

      // Export the updated workbook
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      saveAs(blob, "UpdatedData.xlsx");

      console.log("Excel file exported successfully.");
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  const transformPort = (port) => {
    const portUpper = port.toUpperCase();
    if (portUpper.includes("HO CHI MINH") || portUpper.includes("HOCHIMINH") || portUpper.includes("VIETNAM") || portUpper.includes("VIET NAM")) {
      return "VNCLI";
    } else if (portUpper.includes("YOKOHAMA")) {
      return "JPYOK";
    } else if (portUpper.includes("CAI MEP")) {
      return "VNCMT";
    } else if (portUpper.includes("BANGKOK")) {
      return "THBKK";
    } else if (portUpper.includes("TAICHUNG")) {
      return "TWTXG";
    }
    return port;
  };

  return <button onClick={handleExport}>Export with Template</button>;
};

export default ExportToExcel;
