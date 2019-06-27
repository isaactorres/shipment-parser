# Shipment Parser

## Usage
- install [nvm](https://github.com/nvm-sh/nvm)
- edit `index.js`
- run:
```
nvm use
npm start
```

## ShipmentParser
1. To instantiate a `ShipmentParser`:
```js
const data = `SH348503,O567843,2018-12-10 15:08:58 -0000,Jane,Smith,
SH465980,O936726,2018-12-11 06:08:14 -0000,John,Reynolds,
SH465994,O936726,2018-12-11 06:12:37 -0000,John,Reynolds,
SH867263,O234934,2018-12-11 18:28:51 -0000,Rebecca,Jones,
SH907346,,2018-12-12 21:12:28 -0000,Rebecca,Jones,SH867263
SH927813,,2018-12-15 09:49:35 -0000,Rebecca,Jones,SH907346`;

const shipments = new ShipmentParser(data);
```
2. To print out of all the shipments to the console:
```js
shipments.log();
```
3. To get a shipment as an object, pass the `shipmentNumber` as a param to `getShipment`:
```js
shipments.getShipment('SH348503')
```
4. To get a detailed shipment object (adds the fields `customerFullName` and `shippedDaysAgo`), pass the `shipmentNumber` as a param to `getShipmentWithDetails`:
```js
shipments.getShipmentWithDetails('SH465994')
```
5. To get an array of detailed shipments objects with all associated shipments, pass the `orderNumber` as a param to `getAllShipmentsByOrderNumber`:
```js
shipments.getAllShipmentsByOrderNumber('O234934')
```
