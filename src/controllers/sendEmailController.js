const dotenv = require('dotenv')
const Sib = require('sib-api-v3-sdk')

dotenv.config()

exports.sendEmail = (req, res) => {
    if (req) {
        const email = req.body.email
        const pair = req.body.currencyPairs
        const price = req.body.price

        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.EMAIL_KEY
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: 'ojuhagnes@gmail.com',
            name: 'ForexAlerter',
        }
        const receivers = [
            {
                email: email,
            },
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forex Alert',
            htmlContent: `<h3>Hello ${email}</h3><p>${pair} has reached the target price ${price}</p><p>Click <a href="{{params.link}}" style="text-decoration:none; color:green">Link</a> To return home</p>`,
            params: {
                link: 'http://localhost:3000/',
            },
        })
        .then((result) => {
            console.log(result)
            res.status(200).json({message: "email_sent"})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: "not_sent"})
        })
    }
}