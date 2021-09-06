# Staking Data Collection
This is a data collection tool for contracts on EVM blockchains.


### Operational Requirements
* Node.js 16
* Datacenter class server
* RPC access to one or more archive nodes
* Python 3
* Linux operating system
* md5sum
* sha256sum
* go-ipfs

### Usage

```bash
# DOWNLOAD THE REPOSITORY
git clone https://github.com/notional-labs/staking-data-collection
# INSTALL NODE MODULES
cd staking-data-collection
npm i
# GATHER STAKING DATA
node --max-old-space-size=8192 src/services/staking_collection.js
wc -l collected_data.csv
python sort.py collected_data.csv
sha256sum sorted_collected_data.csv
md5sum sorted_collected_data.csv
rm collected_data.csv
# GATHER BALANCES
node --max-old-space-size=8192 src/services/dfy_collection.js
wc -l collected_data.csv
python sort.py collected_data.csv
sha256sum sorted_collected_data.csv
md5sum sorted_collected_data.csv
ipfs add sorted_collected_data.csv
```


For any given range of block heights, this repository can be used to produce an export of an EVM contract and an associated lock contract.

We export with the javascript code, sort with the Python code, and verify correctness using md5sum, sha256sum and an IPFS CID.




