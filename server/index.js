const express = require('express')
const cors = require('cors')

const app = express()


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
const DBConfig = require('./config/db.config')
db.mongoose.connect(`mongodb://${DBConfig.HOST}:${DBConfig.PORT}/${DBConfig.DB}`, {

}).then(() => {
    console.log("Successfully connect to MongoDB.");
    // initialize database here if needed
}).catch((err) => {
    console.error("Connection error", err);
    process.exit();
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Express is up and running, listening on port ${PORT}`)
})
app.get('/', (request, response) => {
    response.json({
        message: 'express is up and running.'
    })
})

require('./routes/auth.routes')(app);