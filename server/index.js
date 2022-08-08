const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
require('dotenv').config()

connectDB()
const app = express()
const PORT = process.env.PORT || 5000

const cors = require('cors')
app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV === 'development',


}))

app.listen(PORT, console.log(`Server Running at PORT: ${PORT}`))