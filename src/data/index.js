// constants
const TOKEN = `` // TODO: API TOKEN here
const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds

/* The exported functions in the current module return promises to
 * the data wanted: purchase price, latest quotes, chart data */

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

const countDays = (firstDate, secondDate) => Math.round(Math.abs((firstDate - secondDate) / oneDay))

const getRange = (days) => {
    if (days < 30) {
        return '1m'
    } else if (days < 90) {
        return '3m'
    } else if (days < 270) {
        return '6m'
    } else if (days < 366) {
        return '1y'
    } else if (days < 730) {
        return '2y'
    } else {
        return '5y'
    }
}

export const fetchChartData = async (symbols, start) => {
    const range = getRange(countDays(start, new Date()))
    const url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=chart&range=${range}&chartByDay=True&filter=close,date&token=${TOKEN}`
    const res = await fetch(url)
    const chart = await res.json()

    return chart
}
