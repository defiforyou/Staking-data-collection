const Web3 = require('web3');
require('dotenv').config()
require('./node');
const binanceProvider={
    MAINNET:[
        new Web3(process.env.WEB3),
        new Web3(process.env.WEB3),
        new Web3(process.env.WEB3),
        new Web3(process.env.WEB3),
        new Web3(process.env.WEB3),
        new Web3(process.env.WEB3),
        // new Web3(process.env.WEB3),
        // new Web3(process.env.WEB3),
        // new Web3(process.env.WEB3),
        // new Web3(process.env.WEB3),
        // new Web3(process.env.WEB3),
    ],
    TESTNET:[
	    new Web3('https://data-seed-prebsc-2-s3.binance.org:8545/'),
	    // new Web3('https://bsc-dataseed1.defibit.io/'),
	    // new Web3('https://bsc-dataseed1.ninicoin.io/')
    ],
    PRELIVE:[
        new Web3('https://bsc-dataseed.binance.org/'),
        // new Web3('https://bsc-dataseed1.defibit.io/'),
        // new Web3('https://bsc-dataseed1.ninicoin.io/')
    ]
}

module.exports=binanceProvider[process.env.LIVE_NET]
