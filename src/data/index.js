const TOKEN = 'Tpk_ebebf134daff4baea4b35a1a8ba75c42'

/*
[{
    "date": "2019-10-03",
        "uClose": 226.36,
        "uOpen": 225.62,
        "uHigh": 229.79,
        "uLow": 217.77,
        "uVolume": 30492810,
        "close": 229.65,
        "open": 229.25,
        "high": 221.94,
        "low": 218.71,
        "volume": 31410831,
        "change": 1.94,
        "changePercent": 0.8822,
        "label": "Oct 3, 19",
        "changeOverTime": 0.008736
    }]
    */

const LATEST_PRICE = `https://sandbox.iexapis.com/stable/stock/{STOCK}/quote/latestPrice?token=${TOKEN}`

// batch smth like this
// https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote,chart&range=1m&last=5&token=Tpk_ebebf134daff4baea4b35a1a8ba75c42

export const fetchPurchasePrice = async (stock, date) => {
    const url = `https://sandbox.iexapis.com/stable/stock/${stock}/batch?types=quote,chart&filter=latestPrice&exactDate=${date}&chartByDay=true&token=${TOKEN}`
    const res = await fetch(url)
    const { quote: { latestPrice }, chart } = await res.json();
    return { purchase: (chart[0].high + chart[0].low) / 2, value: latestPrice };
}