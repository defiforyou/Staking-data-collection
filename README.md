# Staking Data Collection
This is a data collection tool for contracts on EVM blockchains.


### Operational Requirements
* Node.js 16
* RPC access to one or more archive nodes for
  * BSC
  * Ethereum
  * Ethereum Classic
  * Tron
* Python 3
* Linux operating system
* md5sum
* sha256sum
* go-ipfs

### Usage

```bash
# DOWNLOAD THE REPOSITORY
git clone https://github.com/notional-labs/staking-data-collection
# RUN
bash run.bash
```


For any given range of block heights, this repository can be used to produce an export of an EVM contract and an associated lock contract.

We export with the javascript code, sort with the Python code, and verify correctness using md5sum, sha256sum and an IPFS CID.




