const fetch = require('node-fetch')
const dotenv = require('dotenv')

dotenv.config()

exports.getCurrency = (req, res) => {
    if (req) {
        const myHeaders = new fetch.Headers()
        myHeaders.append("apikey", process.env.PRICE_KEY)

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        }

        fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            //console.log(result)
            const data = result.symbols
            const symbols = Object.keys(data)
            console.log(symbols)
            res.status(200).json({message:symbols})
        })
        .catch((error) => {
            console.log('error', error)
            res.status(500).json({message:"internal_error"})
        });
    }
}