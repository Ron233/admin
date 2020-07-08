const express = require('express')
const app = express()
const port = 3000

const router = express.Router()

app.get('/', (req, res) => res.send('Hello World!'))

router.use('/test', require('./test'))

app.use('/', router)

app.listen(port, () => console.log(port))
