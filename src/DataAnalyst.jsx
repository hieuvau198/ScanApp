import React, { useEffect, useState } from 'react';
import ExportToExcel from './ExportToExcel';

const DataAnalyst = ({ extractedText }) => {
  const [shipper, setShipper] = useState('');
  const [consignee, setConsignee] = useState('');
  const [notifyParty, setNotifyParty] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [grossWeightUnit, setGrossWeightUnit] = useState('');
  const [portOfLoading, setPortOfLoading] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [cbmVolume, setCbmVolume] = useState('');
  const [billOfLadingNo, setBillOfLadingNo] = useState('');
  const [placeAndDateOfIssue, setPlaceAndDateOfIssue] = useState('');
  const [containerAndSealNoMatch, setContainerAndSealNo] = useState('');
  const [containerNo, setContainerNo] = useState('');
  const [sealNo, setSealNo] = useState('');
  const [numberOfPackages, setNumberOfPackages] = useState('');
  const [kindOfPackages, setKindOfPackages] = useState('');
  const [portOfDischarge, setPortOfDischarge] = useState('not found');
  const [partOfDryContainerSTC, setPartOfDryContainerSTC] = useState('');

  useEffect(() => {
    extractData();
  }, [extractedText]);

  const extractData = () => {
    // Extract Shipper
    const shipperMatch = extractedText.match(/Consignor\/Shipper:\s*([\s\S]*?)(?=\s*TEL:|\s*Forwarders Ref|Consigned)/);
    setShipper(shipperMatch ? shipperMatch[1].trim() : 'Shipper data not found.');

    // Extract Consignee
    const consigneeMatch = extractedText.match(/Consigned to Order of:\s*([\s\S]*?)(?=\s*Notify party:|PENANSHIN)/);
    setConsignee(consigneeMatch ? consigneeMatch[1].trim() : 'Consignee data not found.');

    // Extract Notify Party
    const notifyPartyMatch = extractedText.match(/Notify party:\s*([\s\S]*?)(?=\s*PENANSHIN|Country)/);
    setNotifyParty(notifyPartyMatch ? notifyPartyMatch[1].trim() : 'Notify party data not found.');

    // Extract Gross weight
    const grossWeightMatch = extractedText.match(/Gross weight\s*([\d.,]+)\s*(kgs|kg|lbs)/i);

    setGrossWeight(grossWeightMatch ? grossWeightMatch[1].trim() : 'Gross weight data not found.');
    setGrossWeightUnit(grossWeightMatch ? grossWeightMatch[2].trim() : '');

    // Extract Port of Loading
    const portOfLoadingMatch = extractedText.match(/Port of Loading\s*([\s\S]*?)(?=\s*Port of Discharge|$)/i);
    setPortOfLoading(portOfLoadingMatch ? portOfLoadingMatch[1].trim() : 'Port of Loading data not found.');

    // Extract Place of Delivery
    const placeOfDeliveryMatch = extractedText.match(/Place of Delivery\s+([^\n\r]+?)(?=\s+(Consignor\/Shipper|Contents, weight)|[\n\r])/i);
    setPlaceOfDelivery(placeOfDeliveryMatch ? placeOfDeliveryMatch[1].trim() : 'Place of Delivery data not found.');

    // Extract CBM/Volume
    const cbmVolumeMatch = extractedText.match(/CBM\/\s*Volume\s+([\d.,]+\s*\w+)/i);
    setCbmVolume(cbmVolumeMatch ? cbmVolumeMatch[1].trim() : 'CBM/Volume data not found.');

    // Extract Bill of Lading No.
    const billOfLadingNoMatch = extractedText.match(/Bill of Lading No\.\s+([A-Z0-9]+)/i);
    setBillOfLadingNo(billOfLadingNoMatch ? billOfLadingNoMatch[1].trim() : 'Bill of Lading No. data not found.');

    // Trích xuất Place and Date of Issue
    const placeAndDateOfIssueMatch = extractedText.match(/Place and Date of Issue\s+([^\n\r]+?)(?=\s+Freight Payable At|$)/i);
    setPlaceAndDateOfIssue(placeAndDateOfIssueMatch ? placeAndDateOfIssueMatch[1].trim() : 'Place and Date of Issue data not found.');

    // Sử dụng regex để tìm container và seal number
    const containerAndSealNoMatch = extractedText.match(/CONTAINER & SEAL NO\:\s+([A-Za-z0-9]+)\/([A-Za-z0-9]+)/i);

    if (containerAndSealNoMatch) {
      const containerNo = containerAndSealNoMatch[1].trim(); // Mã container
      const sealNo = containerAndSealNoMatch[2].trim(); // Mã seal
      setContainerNo(containerNo);  // Cập nhật state containerNo
      setSealNo(sealNo);            // Cập nhật state sealNo
    } else {
      setContainerNo('Container No. data not found.');
      setSealNo('Seal No. data not found.');
    }
    const totalMatch = extractedText.match(/Total\:\s+([A-Za-z0-9\s\(\)]+)\s+([A-Z\s]+ONLY)/i);
    if (totalMatch) {
      setNumberOfPackages(totalMatch[1].trim());  // ONE (1)
      setKindOfPackages(totalMatch[2].trim());    // CARTON ONLY
    }
    const portOfDischargeMatch = extractedText.match(/Port of Discharge\s+([^\n\r]+?)(?=\s+(Place of Delivery)|[\n\r])/i);
    setPortOfDischarge(portOfDischargeMatch ? portOfDischargeMatch[1].trim() : 'not found');
    const partOfDryContainerSTCMatch = extractedText.match(/PART OF DRY CONTAINER STC\s+([^\n\r]+?)(?=\s+(FREIGHT PREPAID)|[\n\r])/i);
    setPartOfDryContainerSTC(partOfDryContainerSTCMatch ? partOfDryContainerSTCMatch[0].trim() : 'Data not found.');


  };

  return (
    <div className="analysed-data-box">
      <h3>Analysed Data</h3>
      <ExportToExcel
        shipper={shipper}
        consignee={consignee}
        notifyParty={notifyParty}
        grossWeight={grossWeight}
        grossWeightUnit={grossWeightUnit}
        portOfLoading={portOfLoading}
        placeOfDelivery={placeOfDelivery}
        cbmVolume={cbmVolume}
        billOfLadingNo={billOfLadingNo}
        placeAndDateOfIssue={placeAndDateOfIssue}
        containerAndSealNoMatch={containerAndSealNoMatch}
        containerNo={containerNo}
        sealNo={sealNo}
        numberOfPackages={numberOfPackages}
        kindOfPackages={kindOfPackages}
        portOfDischarge={portOfDischarge}
        partOfDryContainerSTC={partOfDryContainerSTC}
      />
      {/* <div>
        <strong>Shipper:</strong>
        <pre>{shipper}</pre>
      </div>
      <div>
        <strong>Consignee:</strong>
        <pre>{consignee}</pre>
      </div>
      <div>
        <strong>Notify Party:</strong>
        <pre>{notifyParty}</pre>
      </div>
      <div>
        <strong>Gross Weight:</strong>
        <pre>{grossWeight}</pre>
      </div>
      <div>
        <strong>Unit:</strong>
        <pre>{grossWeightUnit}</pre>
      </div>
      <div>
        <strong>Port of Loading:</strong>
        <pre>{portOfLoading}</pre>
      </div>
      <div>
        <strong>Place of Delivery:</strong>
        <pre>{placeOfDelivery}</pre>
      </div>
      <div>
        <strong>CBM/Volume:</strong>
        <pre>{cbmVolume}</pre>
      </div>
      <div>
        <h3>Bill of Lading No.</h3>
        <div>{billOfLadingNo}</div>
      </div>
      <div>
        <div>
          <strong>Place and Date of Issue:</strong>
          <pre>{placeAndDateOfIssue}</pre>
        </div>
      </div>
      <div>
        <h3>CONTAINER & SEAL NO:</h3>
        <p>Container No: {containerNo}</p>
        <p>Seal No: {sealNo}</p>
      </div>
      <div>
        <p>Number of Packages: {numberOfPackages}</p>
        <p>Kind of Packages: {kindOfPackages}</p>
      </div>
      <div>
        <h3>Port of Discharge:</h3>
        <pre>{portOfDischarge}</pre>
      </div>
      <div>
        <p>Part of Dry Container STC: {partOfDryContainerSTC}</p>
      </div> */}
    </div>

  );
};

export default DataAnalyst;
