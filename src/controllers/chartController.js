const fetch = require('node-fetch')
const dotenv = require('dotenv')

dotenv.config()

exports.getPrices = (req, res) => {
    if (req) {
        console.log("Request received")
        // Get query params
        const base = req.params.base
        const quote = req.params.quote
        console.log(base)
        console.log(quote)
        // Get dates
        var date = new Date()  
        var day = date.getDate() 
        day = day.toString() 
        if (day.length == 1) {
            day = "0" + day
        }else {
            day = day
        }
        var month = date.getMonth() + 1  
        month = month.toString() 
        if (month.length == 1) {
            month = "0" + month
        }else {
            month = month
        }
        var year = date.getFullYear() 
        var end = year + "-" + month + "-" + day
        console.log(end)
        var start
        var startDay
        var startMonth
        if (parseInt(day) > 7) {
            startDay = parseInt(day) - 7
            startDay = startDay.toString() 
            if (startDay.length == 1) {
                startDay = "0" + startDay
            }else {
                startDay = startDay
            }
            start = year + "-" + month + "-" + startDay
            console.log(start)
        }else if (parseInt(day) < 7) {
            startDay = 7 - parseInt(day)
            startDay = 30 - startDay
            startMonth = parseInt(month) - 1
            startDay = startDay.toString() 
            startMonth = startMonth.toString() 
            if (startDay.length == 1) {
                startDay = "0" + startDay
            }else if (startMonth.length == 1) {
                startMonth = "0" + startMonth
            } else {
                startDay = startDay
                startMonth = startMonth
            }
            start = year + "-" + startMonth + "-" + startDay
        }else if (day == 7) {
            startDay = 30
            startMonth = parseInt(month) - 1
            startMonth = startMonth.toString()
            if (startMonth.length == 1) {
                startMonth = "0" + startMonth
            }else {
                startMonth = startMonth
            }
            start = year + "-" + startMonth + "-" + startDay
        }
        // Make request 
        const myHeaders = new fetch.Headers();
        myHeaders.append("apikey", process.env.PRICE_KEY);

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch(`https://api.apilayer.com/fixer/timeseries?start_date=${start}&end_date=${end}&base=${base}&symbols=${quote}`, requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.success != true) {
                console.log(result)
                res.status(500).json({message:"internal_error"})
            }else {
                var prices = Object.values(result.rates)
                var priceArray = []
                var eachPrice
                for (i = 0; i < prices.length; i++) {
                    let price = Object.values(prices[i])
                    eachPrice = price[0]
                    priceArray.push(eachPrice)
                }
                console.log(priceArray)
                res.status(200).json({message:result})
            }
        })
        .catch((error) => {
            console.log('error', error)
            res.status(500).json({message:"internal_error"})
        })
    }
}
