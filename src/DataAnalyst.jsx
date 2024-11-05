import React, { useEffect, useState } from 'react';

const DataAnalyst = ({ extractedText }) => {
  const [shipper, setShipper] = useState('');
  const [consignee, setConsignee] = useState('');
  const [notifyParty, setNotifyParty] = useState('');
  const [grossWeight, setGrossWeight] = useState('');

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
    const grossWeightMatch = extractedText.match(/Gross weight\s*([\s\S]*?)(?=\s*kgs|\s*kg|\s*lbs|\s*Net weight|$)/i);

    setGrossWeight(grossWeightMatch ? grossWeightMatch[1].trim() : 'Gross weight data not found.');

  };

  return (
    <div className="analysed-data-box">
      <h3>Analysed Data</h3>
      <div>
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
    </div>
  );
};

export default DataAnalyst;
