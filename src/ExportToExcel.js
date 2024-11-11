import React from 'react';
import * as XLSX from 'xlsx';

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
    containerAndSealNoMatch,
    containerNo,
    sealNo,
    numberOfPackages,
    kindOfPackages,
    portOfDischarge,
    partOfDryContainerSTC,
}) => {
    const handleExport = () => {
        // Dữ liệu cần xuất ra Excel
        const data = [
            {
                Shipper: shipper,
                Consignee: consignee,
                'Notify Party': notifyParty,
                'Gross Weight': grossWeight,
                'Gross Weight Unit': grossWeightUnit,
                'Port of Loading': portOfLoading,
                'Place of Delivery': placeOfDelivery,
                'CBM Volume': cbmVolume,
                'Bill of Lading No': billOfLadingNo,
                'Place and Date of Issue': placeAndDateOfIssue,
                'Container and Seal No Match': containerAndSealNoMatch,
                'Container No': containerNo,
                'Seal No': sealNo,
                'Number of Packages': numberOfPackages,
                'Kind of Packages': kindOfPackages,
                'Port of Discharge': portOfDischarge,
                'Part of Dry Container STC': partOfDryContainerSTC,
            },
        ];

        // Tạo một worksheet và workbook
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        // Xuất file Excel
        XLSX.writeFile(workbook, 'ExportedData.xlsx');
    };

    return <button onClick={handleExport}>Export to Excel</button>;
};

export default ExportToExcel;
