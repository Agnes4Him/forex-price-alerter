const fetch = require('node-fetch')
const dotenv = require('dotenv')

dotenv.config()

exports.getLiveData = (req, res) => {
    if (req) {
        const source = req.params.source
        const currency = req.params.currency
        //console.log(source)
        //console.log(currency)
        const myHeaders = new fetch.Headers();
        myHeaders.append("apikey", process.env.PRICE_KEY);

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch(`https://api.apilayer.com/currency_data/live?source=${source}&currencies=${currency}`, requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            console.log(result)
            if (result.success !== true) {
                res.status(500).json({message:"internal_error"})
            }else {
                console.log(result.quotes)
                console.log(Object.values(result.quotes)[0])
                res.status(200).json({message:result.quotes})
            }
        })
        .catch((error) => {
            console.log('error', error)
            res.status(500).json({message:"internal_error"})
        })
    }    
}