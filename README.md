# Staking Data Collection


This is a data collection tool for contracts on BSC.  

Expected Environment:
* Node.js 16
* Datacenter class server with fast and reliable internet
* Python 3
* Linux operating system
* md5sum
* sha256sum
* go-ipfs

Usage:

```bash
git clone https://github.com/notional-labs/staking-data-collection
cd staking-data-collection
npm i
node --max-old-space-size=8192 src/dfy_collection.js
node --max-old-space-size=8192 src/staking_collection.js
```


For any given range of block heights, this repository can be used to produce a determistic export of an EVM contract and an associated lock contract.

The final result will be summarized as a single Content ID, MD5 sum, and sha256sum.  



