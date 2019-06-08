const ShipmentParser = require('./ShipmentParser');

const data = `SH348503,O567843,2018-12-10 15:08:58 -0000,Jane,Smith,
SH465980,O936726,2018-12-11 06:08:14 -0000,John,Reynolds,
SH465994,O936726,2018-12-11 06:12:37 -0000,John,Reynolds,
SH867263,O234934,2018-12-11 18:28:51 -0000,Rebecca,Jones,
SH907346,,2018-12-12 21:12:28 -0000,Rebecca,Jones,SH867263
SH927813,,2018-12-15 09:49:35 -0000,Rebecca,Jones,SH907346`;

const shipments = new ShipmentParser(data);
shipments.log();

console.log('\n', shipments.getShipment('SH348503'));
console.log('\n', shipments.getShipmentWithDetails('SH465994'));
console.log('\n', shipments.getShipmentWithAssociatedShipments('SH927813'));
