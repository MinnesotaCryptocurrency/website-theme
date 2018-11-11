import { Typewriter } from './Typewriter';

Array.prototype.slice.call(document.querySelectorAll('[data-typewrite]')).forEach(e => {
    const text = e.textContent;
    const t = new Typewriter(s => {
        e.textContent = s;
    }, 50, 45);
    t.type(text);
});

import { getPrice, Coin, Price, coins } from './coinprice';

const headerCoinPrice = document.getElementById('header-coinprice'),
    coinPriceTyper = new Typewriter(str => {
        headerCoinPrice.textContent = str;
    });

let lastCoin = null;

function showCoin () {
    let coin = coins[0];
    if (lastCoin !== null) {
        do {
            coin = coins[Math.floor(Math.random() * coins.length)];
        } while (coin === lastCoin);
    }
    lastCoin = coin;

    getPrice(coin).then(price => {
        coinPriceTyper.type(`${coin.name}: $${price.USD >= 1? price.USD.toFixed(2): price.USD.toFixed(4)}`);
        setTimeout(showCoin, 5000);
    });
}

setTimeout(showCoin, 2000);
