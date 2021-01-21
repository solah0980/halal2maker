const express = require('express')
const app = express()
const bodyPaser = require('body-parser')
let cors = require('cors')
let path = require('path')
const port = 8081 || process.env.PORT

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({
    extended: false
}))

require('./config/config')

app.use(cors())

app.use('/assets', express.static(path.join(__dirname, 'public')))

require('./route')(app)



app.listen(port, () => {
    console.log(`server online on port ${port}`)
})