const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
require('dotenv').config()
// const { Result } = require('express-validator')

const connectDB = require('./DB/connect')
const auth = require('./routes/user')
const contact = require('./routes/contact')
const chat = require('./routes/chat')
const message = require('./routes/message')

const app = express()

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/', auth)
app.use('/contact-list', contact)
app.use('/chat', chat)
app.use('/message', message)

const start = async () => {       //here we create an async server start function
    try {
        await connectDB(process.env.URL)  //The server will wait untill the api is connected to the mongodb url
        app.listen(4000, console.log('Server has started')) //then the server starts
    }
    catch (error) {
        console.log(error)
    }
}
start()