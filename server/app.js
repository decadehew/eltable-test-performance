const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const productsData = require('./data.json')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/products', (req, res) => {
  const { page } = req.query

  const data = []
  for (let i = 0; i < 20; i++) {
    data.push(productsData[i])
  }

  res.json({
    code: 200,
    msg: 'success',
    data,
  })
})

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! http://localhost:${port}/`
  )
)
