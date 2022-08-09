const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const currencyRoute = require('./src/routes/currencyRoute')

dotenv.config()

const app = express()
const port = process.env.PORT || 9000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(currencyRoute)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(422).json({message:err.message})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
