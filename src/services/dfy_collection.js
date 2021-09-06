const {createObjectCsvWriter} = require('csv-writer');
const BigNumber = require('bignumber.js');
const fs = require('fs');
const csvParser = require('csv-parser');

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"score","type":"uint256"}],"name":"PawnReputationReduced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"score","type":"uint256"}],"name":"PawnReputationRewarded","type":"event"},{"anonymous":false,"inputs":[],"name":"RewardPawnReputationDisabled","type":"event"},{"anonymous":false,"inputs":[],"name":"RewardPawnReputationEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"TransferEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OPERATOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableRewardPawnReputation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableRewardPawnReputation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"enableTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finishMinting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintingFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"pawnReputationOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"score","type":"uint256"}],"name":"reducePawnReputation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"score","type":"uint256"}],"name":"rewardPawnReputation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPawnReputationEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferFromAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFromAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const bscWeb3 = require("../configs/blockchain/web3");
const numberOfQueue = bscWeb3.length

const resultData = 'collected_dfy_data.csv';
const errorData = 'errorCollectDFYWallet.csv';
const pathResult = `./${resultData}`;
const pathErr = `./${errorData}`;
const helpers = require('../util/helpers');
let util = require('util');
const waitFor = util.promisify(setTimeout);

let blockStart = parseInt(process.env.BLOCK_START_DFY);
let blockStop = parseInt(process.env.BLOCK_END);

let processedMap = {};
let processingMap = {};

let errorProcessedMap = [];

const retryOnce = helpers.retry(1);
const retryThrice = helpers.retry(3);

const csvWriter = createObjectCsvWriter({
    path: pathResult,
    header: [{id: 'wallet', title: 'wallet'}, {id: 'stake', title: 'stake'}, {id: 'balance', title: 'balance'}],
    alwaysQuote: false,
    append: true
})

const csvWriterErr = createObjectCsvWriter({
    path: pathErr,
    header: [{id: 'wallet', title: 'wallet'}],
    alwaysQuote: false,
    append: true
})

async function writeToResultCSV(wallet_address, staking_amount, balance_amount) {
    if(wallet_address in processedMap) {
        return;
    } else {
        processedMap[wallet_address] = {balance: balance_amount, stake: staking_amount};
        let row = [{wallet: wallet_address, stake: staking_amount, balance: balance_amount}]
        await csvWriter.writeRecords(row)
    }
}

async function writeToErrorCSV(wallet_address) {
    if(!errorProcessedMap.includes(wallet_address)) {
        return;
    } else {
        await csvWriterErr.writeRecords([{wallet: wallet_address}])
    }
}

async function readCollectedData(path) {
    const readline = require("readline");
    if(fs.existsSync(path)) {
        const filestream = fs.createReadStream(path);
        const rl = readline.createInterface({
            input: filestream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const data = line.split(",")
            processedMap[data[0]] = {balance: data[2], stake: data[1]}
        }

        filestream.destroy();

        console.log('processedMap successfully');
    }
}

function readErrorData(pathErr) {
    if(fs.existsSync(pathErr)) {
        fs.createReadStream(pathErr)
            .pipe(csvParser())
            .on('data', (data) => {
                errorProcessedMap.push(data.wallet);
            })
            .on('end', () => {
                console.log(errorProcessedMap);
            });
    }
}

function splitToQueue(data) {
    let queueData = {}
    const avgDataLength = data.length / numberOfQueue
    Array.from({ length: numberOfQueue }).forEach((_, index) => {
        queueData[index] = data.slice(Math.floor(index * avgDataLength), Math.floor((index + 1) * avgDataLength))
    })

    queueData[numberOfQueue - 1][queueData[numberOfQueue - 1].length - 1] = data[data.length - 1];

    return queueData
}

async function processEventBlock(blocks, web3) {
    await retryThrice(processTransferEvent, blocks, web3);
}

async function processTransferEvent(blocks, web3) {
    web3.eth.defaultBlock = blockStop;
    const tokenContract = new web3.eth.Contract(abi, process.env.DFY_CONTRACT_ADDRESS, {
        transactionConfirmationBlocks: 1
    })

    console.log('\tScan from ', blocks[0], ' to ', blocks[blocks.length - 1])
    const pastEvents = await tokenContract.getPastEvents('allEvents', {
        fromBlock: blocks[0],
        toBlock: blocks[blocks.length - 1]
    })
    if (pastEvents == null || pastEvents.length == 0) {
        console.log('\tDont have Transfer event from ', blocks[0], ' to ', blocks[blocks.length - 1])
        return
    }

    for (const pastEvent of pastEvents) {
        switch (pastEvent['event']) {
            case 'Transfer' :
                // Added retry in case of network errors.
                await retryThrice(queryTransferData,pastEvent, tokenContract);
                await waitFor(150);
                break;
        }
    }
}

async function queryTransferData(pastEvent, tokenContract) {
    let wallet = pastEvent.returnValues.to;
    if (wallet in processedMap || wallet in processingMap) {
        return;
    }

    console.log('handle wallet: ', wallet);
    processingMap[wallet] = 1;
    try {
        if (wallet in processedMap || errorProcessedMap.includes(wallet)) {
            return;
        }

        let balance = new BigNumber(await tokenContract.methods.balanceOf(wallet).call({}));
        console.log("result: " + wallet + " - " + balance.toFixed());
        await writeToResultCSV(wallet, balance.toFixed(), balance.toFixed());
    } catch (error) {
        console.log(`error ${wallet}\n`);
        console.log(error);
        if(!errorProcessedMap.includes(wallet)) {
            errorProcessedMap.push(wallet);
            await writeToErrorCSV(wallet);
        }

    }
}

async function scan() {
    await readCollectedData(pathResult);

    while (true) {
        try {
            console.log('*************************************************************')
            console.log('\tProcess Binance scan success transactions service at ' + new Date().getTime())

            console.log('Block start: ' + blockStart);

            const blockEnd = Math.min(blockStop + 1, blockStart + 50000);
            console.log('Block end: ' + blockEnd);

            const queueData = splitToQueue(Array.from({length: blockEnd - blockStart}, (_, index) => index + blockStart));

            await Promise.all(
                bscWeb3.map((web3, index) => {
                    return processEventBlock(queueData[index], web3)
                })
            )

            blockStart = blockEnd
            if (blockStart === blockStop + 1) {
                break;
            }
            await waitFor(1000);
        } catch (e) {
            console.error(e.message)
        }
    };

}

scan();
