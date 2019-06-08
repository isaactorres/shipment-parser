const DAYS_IN_MS = 1000 * 60 * 60 * 24;

const parseShipment = (shipment) => {
  if (typeof shipment !== 'string') {
    throw new TypeError('parseShipment expected shipment to be a string');
  }

  const shipmentParts = shipment.split(',');
  return {
    shipmentNumber: shipmentParts[0] || 'N/A',
    orderNumber: shipmentParts[1] || 'N/A',
    shipmentDate: shipmentParts[2] || 'N/A',
    customerFirstName: shipmentParts[3] || 'N/A',
    customerLastName: shipmentParts[4] || 'N/A',
    parentShipmentNumber: shipmentParts[5] || 'N/A',
  };
}

class ShipmentParser {
  constructor(shipments) {
    if (typeof shipments !== 'string') {
      throw new TypeError('ShipmentParser expected shipments to be a string');
    }

    this.shipments = {};
    const shipmentsParts = shipments.split('\n');
    shipmentsParts.forEach(shipment => {
      const parsedShipment = parseShipment(shipment);
      if (parsedShipment.shipmentNumber !== 'N/A') {
        this.shipments[parsedShipment.shipmentNumber] = parsedShipment;
      } else {
        console.warn(`ShipmentParser skipped an invalid shipment: ${JSON.stringify(shipment)}`);
      }
    });
  }

  getCustomerFullName(shipmentNumber) {
    const shipment = this.getShipment(shipmentNumber);
    if (shipment) {
      return `${shipment.customerFirstName} ${shipment.customerLastName}`;
    }
  }

  getShippedDaysAgo(shipmentNumber) {
    const shipment = this.getShipment(shipmentNumber);
    if (shipment) {
      const shippedDate = new Date(shipment.shipmentDate);
      const now = new Date();
      return Math.floor((now - shippedDate) / DAYS_IN_MS);
    }
  }

  shipmentToString(shipmentNumber) {
    const shipment = this.getShipment(shipmentNumber);
    if (shipment) {
      return `Number: ${shipment.shipmentNumber}, Order Number: ${shipment.orderNumber}, Shipped: ${shipment.shipmentDate}, First Name: ${shipment.customerFirstName}, Last Name: ${shipment.customerLastName}, Parent Shipment: ${shipment.parentShipmentNumber}`;
    }
  }

  getShipment(shipmentNumber) {
    return this.shipments[shipmentNumber];
  }

  getShipmentWithDetails(shipmentNumber) {
    const shipment = this.getShipment(shipmentNumber);
    if (shipment) {
      const customerFullName = this.getCustomerFullName(shipmentNumber);
      const shippedDaysAgo = this.getShippedDaysAgo(shipmentNumber);
      return {
        ...shipment,
        customerFullName,
        shippedDaysAgo,
      };
    }
  }

  getShipmentWithAssociatedShipments(shipmentNumber) {
    const shipment = this.getShipmentWithDetails(shipmentNumber);
    if (shipment) {
      const parentShipment = this.getShipmentWithAssociatedShipments(shipment.parentShipmentNumber);
      return {
        ...shipment,
        parentShipment,
      };
    }
  }

  toString() {
    const shipmentKeys = Object.keys(this.shipments);
    let index = 1;
    let str = '';
    shipmentKeys.forEach(key => {
      const shipment = this.shipments[key];
      str += `Shipment #${index}
${this.shipmentToString(shipment.shipmentNumber)}
`;
    index += 1;
    });

    return str;
  }

  log() {
    console.log(this.toString());
  }
}

module.exports = ShipmentParser;
