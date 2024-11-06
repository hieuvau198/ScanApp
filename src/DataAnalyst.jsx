import React, { useEffect, useState } from 'react';

const DataAnalyst = ({ extractedText }) => {
  const [shipper, setShipper] = useState('');
  const [consignee, setConsignee] = useState('');
  const [notifyParty, setNotifyParty] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [grossWeightUnit, setGrossWeightUnit] = useState('');
  const [portOfLoading, setPortOfLoading] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');

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
    </div>
  );
};

export default DataAnalyst;
