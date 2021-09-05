# Staking-data-collection


This is a data collection tool for contracts on BSC.  

Expected Environment:
* Node.js 16
* Datacenter class server with fast and reliable internet
* Linux operating system

Usage:

```bash
git clone https://github.com/notional-labs/staking-data-collection
cd staking-data-collection
npm i
node src/staking_collection.js
node src/dfy_collection.js
```


For any given range of block heights, this repository can be used to produce a determistic export of a bsc contract and an associated lock contract.


Produces CID:

