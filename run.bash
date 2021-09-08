yarn install
yarn run scan
yarn run scanerr
ipfs add collected_data.csv
python sort.py collected_data.csv
ipfs add collected_data.csv

yarn run dfy
ipfs add dfy_holders_list.csv
python sort.py dfy_holders_list.csv


echo "AND THE RESULTS ARE"
ipfs add collected_data.csv
ipfs add dfy_holders_list.csv
