const TOKEN = 'Tpk_ebebf134daff4baea4b35a1a8ba75c42'

export const fetchPurchasePrice = async (stock, date) => {
    const url = `https://sandbox.iexapis.com/stable/stock/${stock}/batch?types=quote,chart&filter=latestPrice&exactDate=${date}&chartByDay=true&token=${TOKEN}`
    const res = await fetch(url)
    const { quote: { latestPrice }, chart } = await res.json()
    const purchase = chart.length > 0 ? (chart[0].high + chart[0].low) / 2 : NaN
    return { purchase, value: latestPrice }
}

export const fetchLatestQuotes = async (symbols) => {
    const url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&filter=latestPrice&token=${TOKEN}`
    const res = await fetch(url)
    const latestQuotes = await res.json()
    return latestQuotes
}