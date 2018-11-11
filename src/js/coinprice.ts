import {Promise} from 'bluebird';

export interface Coin {
    name: string,
    symbol: string,
};

export const coins: Coin[] = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
    },
    {
        name: 'Monero',
        symbol: 'XMR',
    },
    {
        name: 'Litecoin',
        symbol: 'LTC',
    },
    {
        name: 'Dash',
        symbol: 'DASH',
    },
    {
        name: 'Nano',
        symbol: 'NANO',
    },
    {
        name: 'ZCash',
        symbol: 'ZEC',
    },
    {
        name: 'Bitcoin Cash',
        symbol: 'BCH',
    },
    {
        name: 'Dogecoin',
        symbol: 'DOGE',
    },
    {
        name: 'Ripple',
        symbol: 'XRP',
    },
    {
        name: 'Stellar',
        symbol: 'XLM',
    },
];

export interface Price {
    USD: number,
    BTC: number,
};

let prices: null | { [symbol: string]: Price } = null;

let pending: ({
    request: Coin,
    callback: (p: Price) => void,
})[] = [];

export function getPrice (coin: Coin): Promise<Price> {
    return new Promise((resolve, reject)  => {
        if (prices === null) {
            pending.push({
                request: coin,
                callback: resolve,
            });
        } else {
            resolve(prices[coin.symbol]);
        }
    });
}

function updatePrices () {
    fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + (coins.map(c => c.symbol).join(',')) + '&tsyms=USD,BTC')
        .then(r => r.json())
        .then(j => prices = j)
        .then(() => {
            while (pending.length) {
                let r = pending.pop();
                r.callback(prices[r.request.symbol]);
            }
        });

    setTimeout(updatePrices, 30000);
}

updatePrices();
