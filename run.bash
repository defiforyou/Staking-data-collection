yarn install
yarn run scan
ipfs add collected_data.csv
python sort.py collected_data.csv
ipfs add collected_data.csv

yarn run dfy
ipfs add dfy_holders_list2.csv
python sort.py dfy_holders_list2.csv


echo "AND THE RESULTS ARE"
ipfs add collected_data.csv
ipfs add dfy_holders_list2.csv
