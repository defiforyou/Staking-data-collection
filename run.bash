yarn install
yarn run scan
yarn run scanerr
ipfs add collected_data.csv
python sort.py collected_data.csv
ipfs add collected_data.csv

yarn run dfy
ipfs add dfy_holders_list2.csv
python sort.py dfy_holders_list2.csv
ipfs add dfy_holders_list2.csv
